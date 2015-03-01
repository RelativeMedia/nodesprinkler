'use strict';

// routes/user.js

// User Routes
// =============================================================================
module.exports = function(router){

  router.get('/test', function(req, res){
    console.log('hello from /api/v1/');
    res.send({ message: 'Hello from /api/v1' });
    res.end();
  });

  return router;
};
