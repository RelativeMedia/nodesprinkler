'use strict';

var faker = require('faker');
var request = require('supertest');
var should = require('should');
var assert = require('assert');

var url = 'http://localhost:8080/api';

var createValidProgram = function(enabled){
  return request(url)
  .post('/pgoram/create')
  .send({
    name: 'Program ' + faker.lorem.words(1),
    enabled: enabled || false,
  });
};

describe('Program Api', function(){


  // CRUD ACTIONS ON PROGRAMS
  // ===========================================================================
  it('GET /api/program should show a list of programs', function(done){
    request(url)
    .get('/program')
    .end(function(err, res){
        res.status.should.equal(200);
        res.body.should.be.an.Array.and.an.Object;
        res.body.should.not.be.empty;
      done();
    });
  });


  it('GET /api/program/:id should show a single program\'s details', function(done){
    createValidProgram(true).end(function(err, program){
      request(url)
      .get('/program/' + program.body.id)
      .end(function(err, res){
        console.log(res);
        res.status.should.equal(200);
        done();
      });
    });
  });


  it('GET /api/program/:id should show an error if that program doesn\'t exist');

  it('POST /api/program/create should create a new program with valid information');
  it('POST /api/program/create should create a new program with invalid information');

  it('PUT /api/program/:id should update an existing program with valid information');
  it('PUT /api/program/:id should show an error if that stations update information is invalid');

  it('DELETE /api/program/:id should delete a program');
  it('DELETE /api/program/:id should show an error if that program doesn\'t exist');

  // PROGRAM CONTROLS
  // ===========================================================================

  it('POST /api/program/:id/run should manually run a program');
  it('POST /api/program/:id/stop should manually stop a program');

  it('POST /api/program/:id/enable should enable a program');
  it('POST /api/program/:id/disable should disable a program');
});
