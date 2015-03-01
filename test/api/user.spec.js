'use strict';

var faker = require('faker');
var request = require('supertest');
var should = require('should');
var assert = require('assert');


describe('User Api', function(){


  it('POST /api/login should login a user');
  it('POST /api/logout should logout a user');
  it('GET /api/user should show a list of users');
  it('GET /api/user/:id should show a single users details');
  
});
