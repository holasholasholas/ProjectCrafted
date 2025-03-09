const express =  require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/user');

router.post('/register', registerUser);

router.post('/login', loginUser)

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