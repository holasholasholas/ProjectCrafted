const express =  require('express');
const router = express.Router();
const vehicleController = require('../controllers/cars.js');


const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../controllers/user');


// login/sign-up routes
router.post('/sign-up', registerUser);
router.post('/login', loginUser)

// garage routes
router.get('/garage', vehicleController.getGarage);
router.post('/garage', vehicleController.addVehicle);
router.get('/garage/:vehicleId', vehicleController.getVehicleDetails);
router.put('/garage/:vehicleId/modifications', vehicleController.updateModifications);
router.delete('/garage/:vehicleId', vehicleController.deleteVehicle);


module.exports = router;

// Function to get all routes, https://www.restack.io/p/express-router-get-all-routes-answer
const getRoutes = (router) => {
    return router.stack
      .filter(r => r.route)
      .map(r => {
        return {
          path: r.route.path,
          method: Object.keys(r.route.methods)[0].toUpperCase()
        };
      });
  };
  
  console.log(getRoutes(router));