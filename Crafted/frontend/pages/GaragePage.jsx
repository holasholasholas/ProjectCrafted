import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import { useNavigate } from "react-router-dom";
import UserSideBar from "../components/UserSideBar";
import * as garageService from "../services/garageService";
import CreateFirstVehicleBox from "../components/CreateFirstVehicleBox";

const GaragePage = ({ carData, setCarData }) => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggleCreateCarForm, setToggleCreateCarForm] = useState(false);
  const [mods, setMods] = useState([]);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const data = await garageService.showCar();
        const formattedVehicles = data.map((item) => ({
          id: item._id,
          make: item.make,
          model: item.model,
          yearOfManufacture: item.yearOfManufacture,
        }));

        setVehicles(formattedVehicles);

        const modificationsVehicles = data.map((mod) => ({
          id: mod._id,
          make: mod.make,
          model: mod.model,
          yearOfManufacture: mod.yearOfManufacture,
          seats: mod.modifications.interior.seats,
          steeringWheel: mod.modifications.interior.steeringWheel,
          wheels: mod.modifications.exterior.wheels,
          spoiler: mod.modifications.exterior.spoiler,
          exhaust: mod.modifications.engine.exhaustSystems,
          ecu: mod.modifications.engine.ecuTuning,
        }));
        setMods(modificationsVehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Failed to load vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, [toggleCreateCarForm]);

  const handleView = async (car_id) => {
    try {
      const carData = await garageService.getCarDetails(car_id);
      setCarData(carData);
      navigate(`/garage/${car_id}`);
    } catch (error) {
      console.log("unable to view car mod details");
    }
  };

  const handleCreateCar = () => {
    setToggleCreateCarForm(true);
  };

  const handleDelete = async (car_id) => {
    try {
      await garageService.deleteCar(car_id);
      // set new state to force "refresh" after delete
      setVehicles((newList) => newList.filter((car) => car.id !== car_id));
    } catch (error) {
      console.log("Delete vehicle with ID:", car_id);
    }
  };

  const renderGarageContent = () => {
    if (loading) {
      return <div className="text-center py-8">Loading vehicles...</div>;
    }

    if (error) {
      return <div className="text-center text-red-600 py-8">{error}</div>;
    }

    if (vehicles.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-6">No vehicles found in your garage.</p>
          <button
            className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300 shadow-md"
            onClick={handleCreateCar}
          >
            Add Your First Vehicle
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-gray-700">Your Vehicles</h2>
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-300 shadow-md"
            onClick={handleCreateCar}
          >
            Add Vehicle
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onView={() => handleView(vehicle.id)}
              onDelete={() => handleDelete(vehicle.id)}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <UserSideBar />
      
      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-teal-500 mb-6">My Garage</h1>
          {renderGarageContent()}
        </div>
        
        {toggleCreateCarForm && (
          <CreateFirstVehicleBox onClose={() => setToggleCreateCarForm(false)} />
        )}
      </div>
    </div>
  );
};

export default GaragePage;