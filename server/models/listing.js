'use strict';
module.exports = function(sequelize, DataTypes) {
  var Listing = sequelize.define('Listing', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Listing.belongsTo(models.User);
      }
    }
  });
  return Listing;
};
