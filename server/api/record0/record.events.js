/**
 * Record model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Record = require('../../sqldb').Record;
var RecordEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RecordEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Record.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    
    RecordEvents.emit(event + ':' + doc.id, doc);
    RecordEvents.emit(event, doc);
    done(null);
  }
}

module.exports = RecordEvents;
