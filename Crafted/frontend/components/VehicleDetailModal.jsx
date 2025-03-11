// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VehicleDetailsModal = ({ vehicle, onClose, onUpdate }) => {
//   const [activeTab, setActiveTab] = useState('interior');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [modifications, setModifications] = useState(vehicle.modifications || {});
//   const [edited, setEdited] = useState(false);

//   const tabs = [
//     { id: 'interior', label: 'Interior' },
//     { id: 'exterior', label: 'Exterior' },
//     { id: 'handling', label: 'Handling' },
//     { id: 'engine', label: 'Engine' }
//   ];

//   const handleInputChange = (category, subcategory, field, value) => {
//     setModifications(prev => {
//       const updated = { ...prev };
      
//       if (!updated[category]) {
//         updated[category] = {};
//       }
      
//       if (subcategory) {
//         if (!updated[category][subcategory]) {
//           updated[category][subcategory] = {};
//         }
//         updated[category][subcategory][field] = value;
//       } else {
//         updated[category][field] = value;
//       }
      
//       setEdited(true);
//       return updated;
//     });
//   };

//   const saveModifications = async () => {
//     try {
//       setLoading(true);
//       await axios.put(`/api/garage/${vehicle._id}/modifications`, 
//         { modifications },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );
//       setEdited(false);
//       onUpdate();
//       setError(null);
//     } catch (err) {
//       setError('Failed to save modifications. Please try again.');
//       console.error('Error updating modifications:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderFields = (category) => {
//     const categoryData = modifications[category] || {};
    
//     const renderInput = (label, value, onChange) => (
//       <div className="mb-4" key={label}>
//         <label className="block text-gray-700 font-medium mb-2">
//           {label.split(/(?=[A-Z])/).join(' ')}
//         </label>
//         <input
//           type="text"
//           value={value || ''}
//           onChange={onChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//     );

//     if (category === 'interior') {
//       return (
//         <div>
//           {renderInput('Seats', categoryData.seats || 'Stock', 
//             (e) => handleInputChange('interior', null, 'seats', e.target.value))}
//           {renderInput('Steering Wheel', categoryData.steeringWheel || 'Stock', 
//             (e) => handleInputChange('interior', null, 'steeringWheel', e.target.value))}
//           {renderInput('Misc Accessories', categoryData.miscAccessories || 'None', 
//             (e) => handleInputChange('interior', null, 'miscAccessories', e.target.value))}
//           {renderInput('Audio System', categoryData.audioSystem || 'Stock', 
//             (e) => handleInputChange('interior', null, 'audioSystem', e.target.value))}
//         </div>
//       );
//     } else if (category === 'exterior') {
//       return (
//         <div>
//           {renderInput('Body Kits', categoryData.bodyKits || 'Stock', 
//             (e) => handleInputChange('exterior', null, 'bodyKits', e.target.value))}
//           {renderInput('Spoilers', categoryData.spoilers || 'None', 
//             (e) => handleInputChange('exterior', null, 'spoilers', e.target.value))}
          
//           <h4 className="font-semibold text-gray-800 mt-4 mb-2">Aero</h4>
//           {renderInput('Front Splitter', (categoryData.aero || {}).frontSplitter || 'None', 
//             (e) => handleInputChange('exterior', 'aero', 'frontSplitter', e.target.value))}
//           {renderInput('Rear Diffuser', (categoryData.aero || {}).rearDiffuser || 'None', 
//             (e) => handleInputChange('exterior', 'aero', 'rearDiffuser', e.target.value))}
          
//           {renderInput('Wheels', categoryData.wheels || 'Stock', 
//             (e) => handleInputChange('exterior', null, 'wheels', e.target.value))}
//           {renderInput('Tires', categoryData.tires || 'Stock', 
//             (e) => handleInputChange('exterior', null, 'tires', e.target.value))}
//         </div>
//       );
//     } else if (category === 'handling') {
//       return (
//         <div>
//           <h4 className="font-semibold text-gray-800 mb-2">Suspension</h4>
//           {renderInput('Coilovers/Lowering Springs', (categoryData.suspension || {}).coiloversLoweringSprings || 'Stock', 
//             (e) => handleInputChange('handling', 'suspension', 'coiloversLoweringSprings', e.target.value))}
//           {renderInput('Sway Bars', (categoryData.suspension || {}).swayBars || 'Stock', 
//             (e) => handleInputChange('handling', 'suspension', 'swayBars', e.target.value))}
//           {renderInput('Strut Bar', (categoryData.suspension || {}).strutBar || 'None', 
//             (e) => handleInputChange('handling', 'suspension', 'strutBar', e.target.value))}
          
//           <h4 className="font-semibold text-gray-800 mt-4 mb-2">Brakes</h4>
//           {renderInput('Brake Pads', (categoryData.brakes || {}).brakePads || 'Stock', 
//             (e) => handleInputChange('handling', 'brakes', 'brakePads', e.target.value))}
//           {renderInput('Brake Rotors', (categoryData.brakes || {}).brakeRotors || 'Stock', 
//             (e) => handleInputChange('handling', 'brakes', 'brakeRotors', e.target.value))}
//           {renderInput('Brake Calipers', (categoryData.brakes || {}).brakeCalipers || 'Stock', 
//             (e) => handleInputChange('handling', 'brakes', 'brakeCalipers', e.target.value))}
//         </div>
//       );
//     } else if (category === 'engine') {
//       return (
//         <div>
//           {renderInput('ECU Tuning', categoryData.ecuTuning || 'Stock', 
//             (e) => handleInputChange('engine', null, 'ecuTuning', e.target.value))}
          
//           <h4 className="font-semibold text-gray-800 mt-4 mb-2">Exhaust Systems</h4>
//           {renderInput('Downpipe', (categoryData.exhaustSystems || {}).downpipe || 'Stock', 
//             (e) => handleInputChange('engine', 'exhaustSystems', 'downpipe', e.target.value))}
//           {renderInput('Midpipe', (categoryData.exhaustSystems || {}).midpipe || 'Stock', 
//             (e) => handleInputChange('engine', 'exhaustSystems', 'midpipe', e.target.value))}
//           {renderInput('Muffler', (categoryData.exhaustSystems || {}).muffler || 'Stock', 
//             (e) => handleInputChange('engine', 'exhaustSystems', 'muffler', e.target.value))}
          
//           {renderInput('Turbo/Supercharger', categoryData.turboSuperCharger || 'None', 
//             (e) => handleInputChange('engine', null, 'turboSuperCharger', e.target.value))}
//           {renderInput('Air Intake', categoryData.airIntake || 'Stock', 
//             (e) => handleInputChange('engine', null, 'airIntake', e.target.value))}
          
//           <h4 className="font-semibold text-gray-800 mt-4 mb-2">Transmission</h4>
//           {renderInput('Clutch', (categoryData.transmission || {}).clutch || 'Stock', 
//             (e) => handleInputChange('engine', 'transmission', 'clutch', e.target.value))}
//           {renderInput('Final Drive', (categoryData.transmission || {}).finalDrive || 'Stock', 
//             (e) => handleInputChange('engine', 'transmission', 'finalDrive', e.target.value))}
//         </div>
//       );
//     }
    
//     return null;
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] flex flex-col">
//         <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
//           <h2 className="text-xl font-bold text-gray-900">
//             {vehicle.make} {vehicle.model} ({vehicle.yearOfManufacture})
//           </h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         {error && (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-6 mt-4" role="alert">
//             <p>{error}</p>
//           </div>
//         )}
        
//         <div className="flex border-b border-gray-200">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`px-6 py-3 font-medium ${
//                 activeTab === tab.id
//                   ? 'border-b-2 border-blue-500 text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
        
//         <div className="p-6 overflow-y-auto flex-grow">
//           {renderFields(activeTab)}
//         </div>
        
//         <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
//           {edited && (
//             <div className="flex items-center mr-auto text-amber-600">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//               </svg>
//               <span className="text-sm font-medium">Unsaved changes</span>
//             </div>
//           )}
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-700 font-medium rounded-md hover:bg-gray-100 mr-3"
//           >
//             Close
//           </button>
//           <button
//             onClick={saveModifications}
//             disabled={!edited || loading}
//             className={`px-4 py-2 bg-blue-600 text-white font-medium rounded-md ${
//               !edited || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
//             } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center`}
//           >
//             {loading && (
//               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//             )}
//                      Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleDetailsModal;