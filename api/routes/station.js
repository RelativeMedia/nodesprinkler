'use strict';

// routes/station.js

// Station Routes
// =============================================================================
module.exports = function(router){

  // - GET /api/station should show a list of stations
  router.get('/station', function(req, res){
    req.db.Station.findAll().then(function(stations){
        res.json(stations);
    });
  });



  // - GET /api/station/:id should show a single station's details
  router.get('/station/:id', function(req, res){
    req.db.Station.find(req.params.id)
    .then(function(station){
      if(station === null){
        nodesprinkler.log.error('GET /station/' + req.params.id, 'no station found');
        res.status(404).json({ message: 'No Station By That ID' });
      }else{
        nodesprinkler.log.debug('GET /station/' + req.params.id, 'found a station');
        res.json(station);
      }
    });
  });



  // - POST /api/station/create should create a new station with valid information
  router.post('/station/create', function(req, res){
    var station = req.db.Station.build({
      enabled: true,
      status: false,
    });

    station.name    = req.body.name;
    station.enabled = req.body.enabled;

    station
      .save()
      .then(function(station){
        nodesprinkler.log.debug('successful station save /api/station/create');
        res.json(station);
      })
      .catch(function(error){
          nodesprinkler.log.error('error on POST /api/station/create');
          res.status(400).json(error);
      });

  });



  // - PUT /api/station/:id should update an existing station with valid information
  router.put('/station/:id', function(req, res){
    req.db.Station.find(req.params.id)
    .then(function(station){

      station.updateAttributes(req.body)
      .then(function(station){
        res.json(station);
      }).catch(function(error){
        nodesprinkler.log.error('cannot update station due to validation errors, station id', req.params.id);
        res.status(400).json(error);
      });

    })
    .catch(function(error){
      nodesprinkler.log.error('cannot find station with id' + req.params.id, 'unable to perform updates');
      res.status(404).json(error);
    });
  });



  // - DELETE /api/station/:id should delete a station
  router.delete('/station/:id', function(req, res){
    req.db.Station.find(req.params.id)
    .then(function(station){
      station.destroy()
      .then(function(){
        res.sendStatus(200);
      })
      .catch(function(error){
        nodesprinkler.log.error('cannot destroy station with id ' + req.params.id, 'due to errors:', error);
        res.status(400).json(error);
      });
    })
    .catch(function(error){
      nodesprinkler.log.error('cannot find station with id ' + req.params.id);
      res.status(404).json(error);
    });
  });



  // - POST /api/station/enable:id should enable a station
  router.post('/station/enable/:id', function(req, res){
    req.db.Station.find(req.params.id)
    .then(function(station){
      station.updateAttributes({
        enabled: true
      }).then(function(station){
        nodesprinkler.log.debug('station', req.params.id, 'enabled');
        res.json(station);
      }).catch(function(error){
        nodesprinkler.log.error('cannot enable station due to x errors, station id', req.params.id);
        res.status(400).json(error);
      });

    })
    .catch(function(error){
      nodesprinkler.log.error('cannot find station with id ' + req.params.id);
      res.status(404).json(error);
    });
  });



  // - POST /api/station/disable/:id should disable a station
  router.post('/station/disable/:id', function(req, res){
    req.db.Station.find(req.params.id)
    .then(function(station){
      station.updateAttributes({
        enabled: false
      }).then(function(station){
        nodesprinkler.log.debug('station', req.params.id, 'enabled');
        res.json(station);
      }).catch(function(error){
        nodesprinkler.log.error('cannot disable station due to x errors, station id', req.params.id);
        res.status(400).json(error);
      });

    })
    .catch(function(error){
      nodesprinkler.log.error('cannot find station with id ' + req.params.id);
      res.status(404).json(error);
    });
  });



  // - GET /api/station/schedules/:id should show a list of schedules for station :id
  // @TODO: write this route once associations are working for the schedules.
  router.get('/station/schedules/:id', function(req, res){
    res.send({ message: 'Feature Not Implemented Yet' });
  });



  // - POST /api/station/run/:id should manually run a station
  router.post('/station/run/:id', function(req, res){

    // @TODO: need to figure out how to manually run a station off the rpi
    // given a set length of time. a POST to this route should contain the
    // PARAM :id and post body data of the run time in seconds.

    req.db.Station.find({
      where: {
        id: req.params.id,
        enabled: true, // we only want stations which are enabled
        status: false, // we only want stations which aren't running already
      }
    })
    .then(function(station){

      // @TODO: once we found our station, do something on the rpi to turn that
      // station on. and once we know its on, update the database to reflect
      // this.

      station.updateAttributes({
        status: true,
        lastRunStart: new Date()
      })
      .then(function(station){
          nodesprinkler.log.debug('Updated station', station.id, 'set to enabled');
          res.sendStatus(200);
      })
      .catch(function(error){
          nodesprinkler.log.error('Unable to enable station', station.id,'for x reason', error);
          res.sendStatus(400);
      });
    })
    .catch(function(error){
      nodesprinkler.log.error('Unable to find a valid (enabled) station to run');
      res.status(404).json(error);
    });
  });

  // - POST /api/station/stop/:id should manually stop a station
  router.post('/station/stop/:id', function(req, res){

    // @TODO: need to figure out how to manuualy stop a station off the rpi
    // a POST to this route should contain the PARAM :id to stop.

    req.db.Station.find({
      where: {
        id: req.params.id,
        enabled: true, // we only want stations which are enabled
        status: true   // we only want stations which are running right now.
      }
    })
    .then(function(station){

      // @TODO: once we found our station, do something on the rpi to turn that
      // station off. Once we know its off, update the database to reflect this.

      station.updateAttributes({
        status: false,
        lastRunEnd: new Date()
      })
      .then(function(station){
        nodesprinkler.log.debug('Updated station', station.id, 'set to disabled');
        res.sendStatus(200);
      })
      .catch(function(error){
        nodesprinkler.log.error('Unable to disable station', station.id,'for x reason', error);
        res.sendStatus(400);
      });
    })
    .catch(function(error){
      nodesprinkler.log.error('Unable to find a valid (enabled) station to run');
      res.status(404).json(error);
    });
  });

  return router;
};
