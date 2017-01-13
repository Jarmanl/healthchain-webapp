/**
* Using Rails-like standard naming convention for endpoints.
* GET     /api/records              ->  index
* POST    /api/records              ->  create
* GET     /api/records/:id          ->  show
* PUT     /api/records/:id          ->  upsert
* PATCH   /api/records/:id          ->  patch
* DELETE  /api/records/:id          ->  destroy
*/

'use strict';

//import jsonpatch from 'fast-json-patch';
var jsonpatch = require('fast-json-patch');
//import {Record} from '../../sqldb';
var Record = require('../../sqldb');
//import blockchainsample from '../../config/blockchain.sample';
var blockchainsample = require('../../config/blockchain.sample');

//import config from '../../config/environment';
var config = require('../../config/environment');
//import Sequelize from 'sequelize';
var Sequelize = require('sequelize');

// var db = {
//   Sequelize,
//   sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
// };
//
// db.User = db.sequelize.import('../user/user.model');
//import {User} from '../../sqldb';
var {User} = require('../../sqldb');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
      .then(() => {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function getSample(req,res) {
  // console.log(blockchainsample.transactions[0]);
  // return blockchainsample.transactions;
  // return function(records) {
  res.json(blockchainsample.transactions);
  // }
}

// Gets a list of Records
export function index(req, res) {
  return Record.findAll()
  .then(respondWithResult(res))
  .catch(handleError(res));
}
//get users records
export function getUsersRecords(req,res){
  var userId = req.params.userId;
  // Find all projects with a least one task where task.state === project.task
  return Record.findAll({
    where: {
      UserId: userId
    }
  })
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a single Record from the DB
export function show(req, res) {
  return Record.find({
    where: {
      _id: req.params.id
    }
  })
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Creates a new Record in the DB
export function create(req, res) {
  return Record.create(req.body)
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
}

// Upserts the given Record in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Record.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Updates an existing Record in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Record.find({
    where: {
      _id: req.params.id
    }
  })
  .then(handleEntityNotFound(res))
  .then(patchUpdates(req.body))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Deletes a Record from the DB
export function destroy(req, res) {
  return Record.find({
    where: {
      _id: req.params.id
    }
  })
  .then(handleEntityNotFound(res))
  .then(removeEntity(res))
  .catch(handleError(res));
}
