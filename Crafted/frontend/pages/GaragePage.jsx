import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import UserPanel from "../components/UserPanel";
import * as garageService from "../services/garageService";

const GaragePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const data = await garageService.showCar();
        console.log(data)
        const formattedVehicles = data.map((item) => ({
          id: item._id,
          make: item.make,
          model: item.model,
          yearOfManufacture: item.yearOfManufacture,
        }));

 console.log(formattedVehicles[0].make)
        setVehicles(formattedVehicles);
        
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Failed to load vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

// TO DO SERVICES 
const handleView = (vehicleId) => {
    console.log("View vehicle with ID:", vehicleId);
    
  };

  const handleDelete = (vehicleId) => {
    console.log("Delete vehicle with ID:", vehicleId);
    
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <UserPanel />

      {loading ? (
        <div className="text-center py-8">Loading vehicles...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No vehicles found in your garage.</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Your First Vehicle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onView={() => handleView(vehicle.id)}
              onDelete={() => handleDelete(vehicle.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GaragePage;
