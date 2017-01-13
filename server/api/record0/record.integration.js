'use strict';

var app = require('../..');
var request = require('supertest');

var newRecord;

describe('Record API:', function() {

  describe('GET /api/records', function() {
    var records;

    beforeEach(function(done) {
      request(app)
        .get('/api/records')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          records = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      records.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/records', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/records')
        .send({
          user_id:1,
          trans_id:"xvvwj122999",
          req_id: 40,
          approved: true,
          date: new Date("25-10-2016")

          // name: 'New Record',
          // info: 'This is the brand new record!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          // console.log("records "+res.body);
          newRecord = res.body;
          done();
        });
    });

    it('should respond with the newly created record', function() {
      newRecord.user_id.should.equal(1);
      newRecord.trans_id.should.equal('xvvwj122999');
      newRecord.req_id.should.equal(40);
      newRecord.approved.should.equal(true);
      newRecord.date.should.equal(Date("25-10-2016"));
    });

  });

  describe('GET /api/records/:id', function() {
    var record;

    beforeEach(function(done) {
      request(app)

        .get('/api/records/' + newRecord.id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          record = res.body;
          done();
        });
    });

    afterEach(function() {
      record = {};
    });

    it('should respond with the requested record', function() {
      record.user_id.should.equal(1);
      record.trans_id.should.equal('xvvwj122999');
      newRecord.req_id.should.equal(40);
      newRecord.approved.should.equal(true);
      newRecord.date.should.equal(new Date("25-10-2016"));
    });

  });

  describe('PUT /api/records/:id', function() {
    var updatedRecord

    beforeEach(function(done) {
      request(app)

        .put('/api/records/' + newRecord.id)
        .send({
          date: new Date("25-10-2016"),
          approved: false
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRecord = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRecord = {};
    });

    it('should respond with the updated record', function() {
      updatedRecord.date.should.equal(new Date("25-10-2016"));
      updatedRecord.approved.should.equal(false);
    });

  });

  describe('DELETE /api/records/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)

        .delete('/api/records/' + newRecord.id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when record does not exist', function(done) {
      request(app)

        .delete('/api/records/' + newRecord.id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
