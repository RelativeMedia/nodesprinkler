'use strict';

// routes/station.js

// Station Routes
// =============================================================================

var user = require('../controllers/user.controller');
module.exports = function(router){

  router.get('/user', user.requiresToken, user.requiresLogin, user.list);

  router.post('/user/register', user.register);
  router.post('/user/login', user.login);
  router.post('/user/logout', user.requiresToken, user.requiresLogin, user.logout);

  return router;
};
