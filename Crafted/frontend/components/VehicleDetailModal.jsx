// import React, { useState } from 'react';
// import axios from 'axios';

// const SimpleForm = ({ vehicle, onClose, onUpdate }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [inputValue, setInputValue] = useState(vehicle.modifications?.exampleField || '');

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       await axios.put(
//         `/api/garage/${vehicle._id}/modifications`,
//         { modifications: { exampleField: inputValue } },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       onUpdate(); // Notify parent component of the update
//       setError(null);
//     } catch (err) {
//       setError('Failed to save changes. Please try again.');
//       console.error('Error updating modifications:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
//         <h2 className="text-xl font-bold text-gray-900 mb-4">
//           {vehicle.make} {vehicle.model} ({vehicle.yearOfManufacture})
//         </h2>

//         {error && (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
//             <p>{error}</p>
//           </div>
//         )}

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Example Field</label>
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-700 font-medium rounded-md hover:bg-gray-100 mr-3"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`px-4 py-2 bg-blue-600 text-white font-medium rounded-md ${
//               loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
//             } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center`}
//           >
//             {loading && (
//               <svg
//                 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//             )}
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimpleForm;