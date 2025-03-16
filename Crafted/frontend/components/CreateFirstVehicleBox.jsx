import React, { useState } from "react";
import * as garageService from "../services/garageService";

const CreateFirstVehicleBox = ({ onClose }) => {
  const [formInput, setFormInput] = useState({
    make: "",
    model: "",
    yearOfManufacture: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value
    });
    console.log("troubleshooting formInput", { ...formInput, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(formInput);
    try {
      await garageService.createCar(formInput);
      onClose(); 
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm">
      <div className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm">
        <div className="relative flex flex-col bg-white">
          
          <div className="flex flex-col gap-4 p-6">
            <div className="w-full">
              <label className="block mb-2 text-sm text-slate-600">
                Make
              </label>
              <input
                type="text"
                name="make"
                value={formInput.make}
                onChange={handleInputChange}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                placeholder="Enter car make"
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm text-slate-600">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formInput.model}
                onChange={handleInputChange}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                placeholder="Enter car model"
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm text-slate-600">
                Year of Manufacture
              </label>
              <input
                type="text"
                name="yearOfManufacture"
                value={formInput.yearOfManufacture}
                onChange={handleInputChange}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                placeholder="Enter year of manufacture"
              />
            </div>
          </div>

          <div className="p-6 pt-0">
            <button
              onClick={() => handleSubmit(formInput)}
              className="w-full rounded-md bg-teal-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700"
              type="button"
            >
              Create Car
            </button>
            <button
              onClick={onClose}
              className="w-full mt-3 rounded-md bg-gray-200 py-2 px-4 border border-transparent text-center text-sm text-slate-700 transition-all hover:bg-gray-300"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFirstVehicleBox;

