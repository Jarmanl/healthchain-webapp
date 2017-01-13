'use strict';
//import express from 'express';
var express = require('express');
//import config from '../config/environment';
var config = require('../config/environment');
//import {User} from '../sqldb';
var User = require('../sqldb');

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local').default);

export default router;
