'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://postgres@localhost:5432/nan',
   //uri: 'postgres://postgres:aSau1lteD@localhost:5432/healthchain',
    // uri: 'postgres://localhost:5432/healthDB', //Jarman's local db
    // uri: 'postgres://tpnrbqpx:ucOHUyB9EUbowZaZdv3GNKcdkHBYb8AJ@jumbo.db.elephantsql.com:5432/tpnrbqpx', //Emmanual's db
    // uri: 'postgres://mpdtjmue:-Y-Q518g-BUiP3isLpQZYku8XoWb3Fi2@jumbo.db.elephantsql.com:5432/mpdtjmue', //Emmanual's db
    // uri: 'postgres://bmtedmva:WbT1GTYFcPNssIM9p_1DZIb_kSYdajvH@jumbo.db.elephantsql.com:5432/bmtedmva', //Sarah's db
    // uri: 'sqlite://',
    options: {
      logging: true,
      // storage: 'healthDB',
      // storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: false

};
