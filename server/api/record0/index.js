'use strict';

var express = require('express');
var controller = require('./record.controller');
//import auth from '../../auth/auth.service';
var auth = require('../../auth/auth.service');

// router.get('/me', auth.isAuthenticated(), controller.me);

var router = express.Router();

router.get('/', auth.hasRole('user'), controller.index);
router.get('/:id', auth.hasRole('user'), controller.show);
router.get('/bc/:blockId', auth.hasRole('user'), controller.show);
router.post('/', auth.hasRole('user'), controller.create);
router.put('/:id', auth.hasRole('user'), controller.update);
router.patch('/:id', auth.hasRole('user'), controller.update);
router.delete('/:id', auth.hasRole('user'), controller.destroy);

module.exports = router;
