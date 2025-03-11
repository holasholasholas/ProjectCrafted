const Vehicle = require('../models/vehicleSchema');
const User = require('../models/userSchema');
const jwt = require("jsonwebtoken");

// Get all vehicles for logged in user
const getGarage = async (req, res) => {
  try {

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.payload;
    
    if (!req.user) {
        return res.status(401).json({ 
          message: 'Error fetching garage', 
          error: 'Authentication required' 
        });
      }

    const userId = req.user.id;

    // Find user and populate vehicles
    const user = await User.findById(userId).populate('vehicles');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ vehicles: user.vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching garage', error: error.message });
  }
};

// Add a new vehicle
const addVehicle = async (req, res) => {
  try {

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.payload;
    const userId = req.user.id;
    const { make, model, yearOfManufacture } = req.body;

    // Create new vehicle
    const newVehicle = await Vehicle.create({
    //   owner: userId,
      make: make,
      model: model,
      yearOfManufacture: yearOfManufacture
      // Modifications will use the default values
    });

    // Save the vehicle
    const savedVehicle = await newVehicle.save();

    // Add vehicle to user's vehicles array https://www.mongodb.com/docs/manual/reference/operator/update/push/
    await User.findByIdAndUpdate(
      userId,
      { $push: { vehicles: savedVehicle._id } }
    );

    res.status(201).json({ message: 'Vehicle added successfully', vehicle: savedVehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle', error: error.message });
  }
};

// Get vehicle details
const getVehicleDetails = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const userId = req.user.id;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Ensure vehicle belongs to logged in user
    if (vehicle.owner.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to view this vehicle' });
    }

    res.status(200).json({ vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle details', error: error.message });
  }
};

// Update vehicle modifications
const updateModifications = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const userId = req.user.id;
    const { modifications } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Ensure vehicle belongs to logged in user
    if (vehicle.owner.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to modify this vehicle' });
    }

    // Update only the provided modification fields
    // This allows partial updates to the nested modification object
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      { $set: { 'modifications': { ...vehicle.modifications, ...modifications } } },
      { new: true }
    );

    res.status(200).json({ message: 'Modifications updated successfully', vehicle: updatedVehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error updating modifications', error: error.message });
  }
};

// Delete a vehicle
const deleteVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const userId = req.user.id;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Ensure vehicle belongs to logged in user
    if (vehicle.owner.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this vehicle' });
    }

    // Remove vehicle from user's vehicles array
    await User.findByIdAndUpdate(
      userId,
      { $pull: { vehicles: vehicleId } }
    );

    // Delete the vehicle
    await Vehicle.findByIdAndDelete(vehicleId);

    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
  }
};

// Export all functions at once
module.exports = {
  getGarage,
  addVehicle,
  getVehicleDetails,
  updateModifications,
  deleteVehicle
};