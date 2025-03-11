import { useState } from 'react';

const AddVehicleModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    yearOfManufacture: new Date().getFullYear()
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.make.trim()) {
      newErrors.make = 'Make is required';
    }
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    if (!formData.yearOfManufacture) {
      newErrors.yearOfManufacture = 'Year is required';
    } else if (
      formData.yearOfManufacture < 1900 ||
      formData.yearOfManufacture > new Date().getFullYear() + 1
    ) {
      newErrors.yearOfManufacture = 'Please enter a valid year';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAdd({
        ...formData,
        yearOfManufacture: parseInt(formData.yearOfManufacture)
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Vehicle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label htmlFor="make" className="block text-gray-700 font-medium mb-2">
              Make
            </label>
            <input
              type="text"
              id="make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.make ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g. Toyota"
            />
            {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="model" className="block text-gray-700 font-medium mb-2">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.model ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g. Supra"
            />
            {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="yearOfManufacture" className="block text-gray-700 font-medium mb-2">
              Year
            </label>
            <input
              type="number"
              id="yearOfManufacture"
              name="yearOfManufacture"
              value={formData.yearOfManufacture}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear() + 1}
              className={`w-full px-3 py-2 border ${
                errors.yearOfManufacture ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.yearOfManufacture && (
              <p className="text-red-500 text-sm mt-1">{errors.yearOfManufacture}</p>
            )}
          </div>
          <div className="flex justify-end space-x-4 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 font-medium rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;