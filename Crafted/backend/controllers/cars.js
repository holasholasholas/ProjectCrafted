// all URL here begin with /garage
const Vehicle = require('../models/vehicleSchema');
const User = require('../models/userSchema');
const jwt = require("jsonwebtoken");
const verifyToken = require('../middleware/verify-token');
const express = require('express');
const router = express.Router();


// create new car and tag to user
router.post('/', verifyToken, async(req, res) => {
    try{
      
        req.body.owner = req.user._id; // tag vehicle to user who created it
        const newVehicle = await Vehicle.create(req.body);

        await User.findByIdAndUpdate( // push vehicle into user's vehicle array
            req.user._id,
            { $push: { vehicles: newVehicle._id } }, 
            { new: true }
        );

        newVehicle._doc.owner = req.user;
        res.status(201).json(newVehicle);
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
});

// Find cars created by user via decrypting token and get id from it 
router.get("/", verifyToken, async (req, res) => {
  
    try {
      // Find the user and populate their vehicles
      const user = await User.findById(req.user._id).populate('vehicles');
      console.log(user)
      
      if (!user.vehicles) {
        return res.status(200).json([]); // Return empty array if no vehicles
      }
      
      res.status(200).json(user.vehicles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

//   // UPDATE: update a car's information
// router.put("/:car_id", verifyToken, async (req, res) => {
//   try {
//     const car_id = req.params.car_id;
    
//     // Find the car first to verify ownership
//     const car = await Vehicle.findById(car_id);
    
//     if (!car) {
//       return res.status(404).json({ error: "Car not found" });
//     }
    
//     const updatedCar = await Vehicle.findByIdAndUpdate(
//       car_id,
//       req.body,
//       { new: true }
//     );
    
//     res.status(200).json(updatedCar);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

  // Find specific car details and modlist 
  router.get("/:car_id", verifyToken, async (req, res) => {
    try {
      const car_id = req.params.car_id;
      
      
      const car = await Vehicle.findById(car_id);
      
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      
      
      res.status(200).json(car);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  
  router.delete("/:car_id", verifyToken, async (req, res) => {
    try {
      const { car_id } = req.params;
      console.log(car_id);
      
      // Find the car first to verify ownership
      const deleteCar = await Vehicle.findByIdAndDelete(car_id);
      console.log(deleteCar)
      // Remove the car reference from the user's vehicle array
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { vehicles: car_id } }
      );
      
      res.status(200).json({ message: "Car successfully deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // updates car mod list, have to send whole form 
  router.put("/:car_id/modifications", verifyToken, async (req, res) => {
    try{
        const car_id = req.params.car_id;
        const updatedModifications = req.body.modifications;
        
        const car = await Vehicle.findById(car_id);
        car.modifications = updatedModifications;
        await car.save();
        
        res.status(200).json(car);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    
  });
  
  module.exports = router;