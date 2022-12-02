'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlacklistedToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BlacklistedToken.isBlacklisted = async function (token){
    const blacklistedTokens = await this.findAll({
      where: {
        token
      }
    });

    if(blacklistedTokens.length){
      return true;
    }else{
      return false;
    }
  }

  BlacklistedToken.init({
    token: DataTypes.STRING,
    iat: DataTypes.BIGINT,
    expires: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'BlacklistedToken',
  });
  return BlacklistedToken;
};