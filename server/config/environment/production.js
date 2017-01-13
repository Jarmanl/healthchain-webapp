'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP
    || process.env.ip
    || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT
    || process.env.PORT
    || 8080,

  sequelize: {
    uri: process.env.SEQUELIZE_URI
      || 'postgres://yjanmfyw:HlSlrEY92XO-rgwywaqQvItfk2YUMwA5@echo-01.db.elephantsql.com:5432/yjanmfyw',
    // uri: process.env.SEQUELIZE_URI
    //   || 'sqlite://',
    options: {
      logging: false,
      storage: 'dist.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
