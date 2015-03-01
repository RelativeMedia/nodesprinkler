'use strict';

var faker = require('faker');
var request = require('supertest');
var should = require('should');
var assert = require('assert');


describe('Program Api', function(){


  // CRUD ACTIONS ON PROGRAMS
  // ===========================================================================
  it('GET /api/program should show a list of programs');
  it('GET /api/program/:id should show a single program\'s details');
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
