// const mongoose = require('mongoose');

// const ModificationSchema = new mongoose.Schema({
//   interior: {
//     seats: { type: String, default: 'Stock' },
//     steeringWheel: { type: String, default: 'Stock' },
//     miscAccessories: { type: String, default: 'None' },
//     audioSystem: { type: String, default: 'Stock' }
//   },
//   exterior: {
//     bodyKits: { type: String, default: 'Stock' },
//     spoilers: { type: String, default: 'None' },
//     aero: {
//       frontSplitter: { type: String, default: 'None' },
//       rearDiffuser: { type: String, default: 'None' }
//     },
//     wheels: { type: String, default: 'Stock' },
//     tires: { type: String, default: 'Stock' }
//   },
//   handling: {
//     suspension: {
//       coiloversLoweringSprings: { type: String, default: 'Stock' },
//       swayBars: { type: String, default: 'Stock' },
//       strutBar: { type: String, default: 'None' }
//     },
//     brakes: {
//       brakePads: { type: String, default: 'Stock' },
//       brakeRotors: { type: String, default: 'Stock' },
//       brakeCalipers: { type: String, default: 'Stock' }
//     }
//   },
//   engine: {
//     ecuTuning: { type: String, default: 'Stock' },
//     exhaustSystems: {
//       downpipe: { type: String, default: 'Stock' },
//       midpipe: { type: String, default: 'Stock' },
//       muffler: { type: String, default: 'Stock' }
//     },
//     turboSuperCharger: { type: String, default: 'None' },
//     airIntake: { type: String, default: 'Stock' },
//     transmission: {
//       clutch: { type: String, default: 'Stock' },
//       finalDrive: { type: String, default: 'Stock' }
//     }
//   }
// });

// const CarModification = mongoose.model('CarModification', ModificationSchema);

// module.exports = CarModification;