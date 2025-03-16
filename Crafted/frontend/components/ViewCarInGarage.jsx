import { useState, useEffect } from "react";

const ViewCarInGarage = ({ onClose, results }) => {
  const [carDetails, setCarDetails] = useState({
    make: "",
    model: "",
    yearOfManufacture: "",
    modifications: {
      interior: { seats: "", steeringWheel: "" },
      exterior: { wheels: "", spoilers: "" },
      engine: {
        exhaustSystems: { downpipe: "", midpipe: "", muffler: "" },
        ecuTuning: ""
      }
    }
  });

  useEffect(() => {
    
    if (results) {

      const carData = results[0]; // 0 in console.log
      // why without optional chaining this will crash? timing issue?
      setCarDetails({
        make: carData.make,
        model: carData.model,
        yearOfManufacture: carData.yearOfManufacture,
        modifications: {
          interior: { 
            seats: carData.modifications?.interior?.seats, 
            steeringWheel: carData.modifications?.interior?.steeringWheel 
          },
          exterior: { 
            wheels: carData.modifications?.exterior?.wheels, 
            spoilers: carData.modifications?.exterior?.spoilers 
          },
          engine: {
            exhaustSystems: { 
              downpipe: carData.modifications?.engine?.exhaustSystems?.downpipe, 
              midpipe: carData.modifications?.engine?.exhaustSystems?.midpipe, 
              muffler: carData.modifications?.engine?.exhaustSystems?.muffler 
            },
            ecuTuning: carData.modifications?.engine?.ecuTuning
          }
        }
      });
    }
  }, [results]);

  return (
    <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm">
      <div className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm">
        <div className="relative flex flex-col bg-white">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-medium text-slate-800">Car Details</h3>
          </div>
          
          <div className="flex flex-col gap-4 p-6">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-slate-600">
                Basic Information
              </label>
              
              <div className="pl-2 border-l-2 border-slate-300">
                <p className="text-sm text-slate-700"><span className="font-medium">Make:</span> {carDetails.make}</p>
                <p className="text-sm text-slate-700"><span className="font-medium">Model:</span> {carDetails.model}</p>
                <p className="text-sm text-slate-700"><span className="font-medium">Year of Manufacture:</span> {carDetails.yearOfManufacture}</p>
              </div>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-slate-600">
                Modifications
              </label>
              
              <div className="pl-2 border-l-2 border-slate-300">
                <h4 className="mt-2 mb-1 text-sm font-medium text-slate-600">Interior</h4>
                <div className="pl-2 mb-2 border-l border-slate-200">
                  <p className="text-sm text-slate-700"><span className="font-medium">Seats:</span> {carDetails.modifications.interior.seats}</p>
                  <p className="text-sm text-slate-700"><span className="font-medium">Steering Wheel:</span> {carDetails.modifications.interior.steeringWheel}</p>
                </div>
                
                <h4 className="mt-2 mb-1 text-sm font-medium text-slate-600">Exterior</h4>
                <div className="pl-2 mb-2 border-l border-slate-200">
                  <p className="text-sm text-slate-700"><span className="font-medium">Wheels:</span> {carDetails.modifications.exterior.wheels}</p>
                  <p className="text-sm text-slate-700"><span className="font-medium">Spoilers:</span> {carDetails.modifications.exterior.spoilers}</p>
                </div>
                
                <h4 className="mt-2 mb-1 text-sm font-medium text-slate-600">Engine</h4>
                <div className="pl-2 border-l border-slate-200">
                  <p className="text-sm text-slate-700"><span className="font-medium">ECU Tuning:</span> {carDetails.modifications.engine.ecuTuning}</p>
                  
                  <h5 className="mt-1 mb-1 text-xs font-medium text-slate-600">Exhaust Systems</h5>
                  <div className="pl-2 border-l border-slate-200">
                    <p className="text-sm text-slate-700"><span className="font-medium">Downpipe:</span> {carDetails.modifications.engine.exhaustSystems.downpipe}</p>
                    <p className="text-sm text-slate-700"><span className="font-medium">Midpipe:</span> {carDetails.modifications.engine.exhaustSystems.midpipe}</p>
                    <p className="text-sm text-slate-700"><span className="font-medium">Muffler:</span> {carDetails.modifications.engine.exhaustSystems.muffler}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <button
              onClick={onClose}
              className="w-full rounded-md bg-slate-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700 focus:bg-slate-700 focus:shadow-none active:bg-slate-800"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCarInGarage;