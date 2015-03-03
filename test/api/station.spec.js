'use strict';

var faker = require('faker');
var request = require('supertest');
var should = require('should');
var assert = require('assert');
var url = 'http://localhost:8080/api';

var createValidStation = function(enabled){
  return request(url)
  .post('/station/create')
  .send({
    name: 'Station ' + faker.lorem.words(1),
    enabled: enabled || false,
  });

};

describe('Station Api ::', function(){

  // CRUD ACTIONS ON STATIONS
  // ===========================================================================
  it('GET /api/station should show a list of stations', function(done){
    createValidStation().end(function(err, station){
      request(url)
      .get('/station')
      .end(function(err, res){

        if(err) {
          throw err;
        }

        res.status.should.equal(200);
        res.body.should.be.an.Array.and.an.Object;
        res.body.should.not.be.empty;
        done();
      });
    });
  });

  it('GET /api/station/:id should show a single station\'s details', function(done){
    createValidStation().end(function(err, station){



      request(url)
      .get('/station/' + station.body.id)
      .end(function(err, res){

        if(err){
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
    });
  });

  it('GET /api/station/:id should show an error if that station doesn\'t exist', function(done){
    request(url)
    .get('/station/999999999999')
    .end(function(err, res){

      if(err){
        throw err;
      }

      res.status.should.equal(404);
      res.body.should.have.property('message');
      done();
    });
  });

  it('POST /api/station/create should create a new station with valid information', function(done){

    var station = {
      name: 'Station ' + faker.lorem.words(1),
      enabled: true,
    };

    request(url)
    .post('/station/create')
    .send(station)
    .end(function(err, res){
      if(err){
        throw err;
      }

      res.status.should.equal(200);
      res.body.should.have.property('id');
      res.body.enabled.should.be.true;
      res.body.name.should.not.be.empty;

      done();
    });
  });

  it('POST /api/station/create should show an error when trying to create a new station with invalid information', function(done){
    var station = {
      enabled: true,
    };

    request(url)
    .post('/station/create')
    .send(station)
    .end(function(err, res){
      if(err){
        throw err;
      }

      res.status.should.equal(400);
      done();
    });
  });

  it('PUT /api/station/:id should update an existing station with valid information', function(done){
    createValidStation().end(function(err, station){
      var stationUpdates = {
        name: 'Station ' + faker.lorem.words(1),
        enabled: true
      };
      request(url)
      .put('/station/' + station.body.id)
      .send(stationUpdates)
      .end(function(err, res){
        if(err){
          throw err;
        }
        res.status.should.equal(200);
        res.body.name.should.equal(stationUpdates.name);
        res.body.enabled.should.equal(stationUpdates.enabled);
        done();
      });
    });
  });


  it('PUT /api/station/:id should show an error if that stations update information is invalid', function(done){
    createValidStation().end(function(err, station){
      request(url)
      .put('/station/' + station.body.id)
      .send({
        name: null,
        enabled: true
      })
      .end(function(err, res){
        if(err){
          throw err;
        }

        res.status.should.equal(400);
        done();
      });
    });
  });

  it('DELETE /api/station/:id should delete a station', function(done){

    createValidStation().end(function(err, station){
      request(url)
      .delete('/station/' + station.body.id)
      .end(function(err, res){
        if(err){
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
    });
  });
  it('DELETE /api/station/:id should show an error if that station doesn\'t exist', function(done){
    request(url)
    .delete('/station/999999999')
    .end(function(err, res){
      if(err){
        throw err;
      }

      res.status.should.equal(404);
      done();
    });
  });

  // STATION CONTROLS
  // ===========================================================================
  it('POST /api/station/enable/:id should enable a station', function(done){
    createValidStation().end(function(err, station){
      request(url)
      .post('/station/enable/' + station.body.id)
      .send()
      .end(function(err, res){
        if(err){
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
    });
  });
  it('POST /api/station/disable/:id should disable a station', function(done){
    createValidStation(true).end(function(err, station){
      request(url)
      .post('/station/disable/' + station.body.id)
      .send()
      .end(function(err, res){
        if(err){
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
    });
  });

  it('POST /api/station/run/:id should manually run a station', function(done){
    createValidStation(true).end(function(err, station){
      request(url)
      .post('/station/run/' + station.body.id)
      .send({
        runTime: 60 //run for 60 seconds
      })
      .end(function(err, res){
        if(err){
          throw err;
        }

        res.status.should.equal(200);
        done();
      });
    });
  });

  it('POST /api/station/stop/:id should manually stop a station', function(done){


    createValidStation(true).end(function(err, station){
      request(url)
      .post('/station/run/' + station.body.id)
      .send({
        runTime: 60 //run for 60 seconds,
      })
      .end(function(err, res){
        if(err){
          throw err;
        }
        request(url)
        .post('/station/stop/' + station.body.id)
        .send()
        .end(function(err, res){
          if(err){
            throw err;
          }
          res.status.should.equal(200);
          done();
        });
      });
    });
  });

  it('GET /api/station/schedules/:id should show a list of schedules for station :id');
});
