'use strict';

module.exports = function(sequelize, DataTypes) {

  var record = sequelize.define('Record', {
    id: {
      type:  DataTypes.INTEGER ,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id:DataTypes.INTEGER,
    trans_id:DataTypes.STRING,
    req_id: DataTypes.INTEGER,
    approved: {type:DataTypes.BOOLEAN,allowNull: false, defaultValue: false},
    date: DataTypes.DATE
    /*date: {
      type: DataTypes.DATEONLY,
      get: function() {
        return moment.utc(this.getDataValue('date')).format('YYYY-MM-DD');
      }
    }*/
  },{
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        record.belongsTo(models.User);
      }
    },
    underscored: true,
    freezeTableName:true,
    tableName:'record'

  });
  return record;
};
