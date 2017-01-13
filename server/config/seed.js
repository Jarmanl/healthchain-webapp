/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
//import sqldb from '../sqldb';
var sqldb = require('../sqldb');
var User = sqldb.User;
var Record = sqldb.Record;
var todayDate = Date.now();

/*
Thing.sync()
  .then(() => {
    return Thing.destroy({ where: {} });
  })
  .then(() => {
    Thing.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
            + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
            + 'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, '
            + 'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep '
            + 'tests alongside code. Automatic injection of scripts and '
            + 'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more '
            + 'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript '
            + 'payload, minifies your scripts/css/images, and rewrites asset '
            + 'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku '
            + 'and openshift subgenerators'
    }]);
  });
*/
//
User.sync()
  .then(() => {
    return User.destroy({ where: {} });
  })
  .then(() => {
    User.bulkCreate([
      {
        provider: 'local',
        firstName: 'Dr Who',
        lastName: 'Friend',
        dob: '11/11/1992',
        email: 'test@example.com',
        password: 'test'
      },
      {
        provider: 'local',
        firstName: 'Test User',
        lastName: '#1',
        dob: '11/11/1992',
        email: 'test01@example.com',
        password: 'test'
      },
      {
        provider: 'local',
        firstName: 'Test User',
        lastName: '#2',
        dob: '11/11/1992',
        email: 'test02@example.com',
        password: 'test'
      },
      {
        provider: 'local',
        firstName: 'Test User',
        lastName: '#3',
        dob: '11/11/1992',
        email: 'test03@example.com',
        password: 'test'
      },
      {
        provider: 'local',
        firstName: 'Test User',
        lastName: '#4',
        dob: '11/11/1992',
        email: 'test04@example.com',
        password: 'test'
      },
      {
        provider: 'local',
        firstName: 'Emman',
        lastName: 'Etti',
        dob: '23/11/1991',
        email: 'etti@our.com',
        password: 'test'
      },
      {
      provider: 'local',
      role: 'admin',
      firstName: 'Super',
      lastName: 'Admin',
      dob: '11/11/1992',
      email: 'admin@example.com',
      password: 'admin'
    }])
    .then(() => {
      console.log('finished populating users');
    });
  });

Record.sync()
  .then(() => {
    return Record.destroy({where: {}})
  })
  .then(() => {
    Record.bulkCreate([
        {
          UserId:1,
          trans_id: 1,
          req_id: 1,
          req_name: "Dr Who",
          hospital: "IWK Hospital",
          date: todayDate,
        },{
          UserId: 1,
          trans_id: 2,
          req_id: 2,
          req_name: "Dr What",
          hospital: "Dartmouth General",
          date: todayDate,
        },{
          UserId: 2,
          trans_id: 3,
          req_id: 3,
          req_name: "Dr When",
          hospital: "QEII",
          date: todayDate,
        }
    ])
    .then(() => {
      console.log("finished populating records");
    });
  });
