//import app from './';
var app = require('./');

after(function(done) {
  app.angularFullstack.on('close', () => done());
  app.angularFullstack.close();
});
