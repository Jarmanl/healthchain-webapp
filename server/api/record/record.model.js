'use strict';
//import sqldb from '../../sqldb';
var sqldb = require('../../sqldb');
var User = require('../../sqldb').User;


export default function(sequelize, DataTypes) {
/*  return sequelize.define('Record', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    user_ID:{
      type: DataTypes.INTEGER,
    },
    trans_ID:{
      type: DataTypes.STRING,
    },
    req_ID:{
      type: DataTypes.INTEGER,
    },
    approved:{
      type: DataTypes.BOOLEAN,
    },
    date:{
      type: DataTypes.DATE,
    }
  });
  */
  var record = sequelize.define('Record', {
    id: {
      type:  DataTypes.INTEGER ,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bc_id:DataTypes.STRING,
    trans_id:DataTypes.STRING,
    req_id: DataTypes.INTEGER,
    req_name: DataTypes.STRING,
    hospital: DataTypes.STRING,
    approved: {
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    date: DataTypes.DATE
    /*date: {
      type: DataTypes.DATEONLY,
      get: function() {
        return moment.utc(this.getDataValue('date')).format('YYYY-MM-DD');
      }
    }*/


  });

  return record;
}
