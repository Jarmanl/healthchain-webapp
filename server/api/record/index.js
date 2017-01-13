'use strict';

var express = require('express');
var controller = require('./record.controller');

var router = express.Router();

router.get('/', controller.index);
// router.get('/', controller.getSample);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
router.get('/:userId/records', controller.getUsersRecords);

module.exports = router;
