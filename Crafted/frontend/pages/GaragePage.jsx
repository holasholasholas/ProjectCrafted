import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import { useNavigate } from "react-router-dom";
// import UserPanel from "../components/UserPanel";
import * as garageService from "../services/garageService";
import { CarModForm } from "../components/ModPopUp";


const GaragePage = () => {

const navigate = useNavigate();

const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [mods, setMods] = useState({});

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
        
        console.log(formattedVehicles)
        setVehicles(formattedVehicles);
       
        
        // mod list doesn't have id in db, should just get from above just nested more

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
        ecu: mod.modifications.engine.ecuTuning


        }))
        console.log(modificationsVehicles)
        setMods(modificationsVehicles)
        

      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Failed to load vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    async function deleteVehicle(){
        try {
            setLoading(true);
            await garageService.deleteCar()
            
        } catch (error) {
            console.log("Error deleting car", error);
            setError("Failed to delete vehiclee. Please try again later.");
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

  const handleDelete = async (car_id) => {
    try {
        await garageService.deleteCar(car_id);
        // set new state to force "refresh" after delete
        setVehicles(newList => newList.filter(car => car.id !== car_id)) // https://stackoverflow.com/questions/58102050/refresh-page-after-deleting-in-angular
    } catch (error) {
        console.log("Delete vehicle with ID:", car_id);
        
    }};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
console.log(mods)
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <UserPanel /> */}

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
              onView={() => setOpen((cur) => !cur)}
              onDelete={() => handleDelete(vehicle.id)}
            />
          ))}
         <div>
  {mods.map((vehicle) => (
    <CarModForm
      key={vehicle.id} 
      vehicles={vehicle} 
      mods={mods} 
      open={open}
      setOpen={setOpen} 
    />
  ))}
</div>
              
          
        </div>
      )}
    </div>
  );
};

export default GaragePage;
