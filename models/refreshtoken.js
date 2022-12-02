'use strict';
const {
  Model
} = require('sequelize');
const {v4: uuidv4 } = require("uuid")
const authConfig = require('../config/auth')

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RefreshToken.belongsTo(models.Account, {
        onDelete: "CASCADE",
        foreignKey: 'accountId'
      })
    }


  };

  RefreshToken.createToken = async function (user, tokenId) {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + authConfig.jwtRefreshExpiration);

    let _token = uuidv4();

    let refreshToken = await this.create({
      token: _token,
      accountId: user.accountId,
      iat: Date.now(), 
      tokenId,
      expires: expiredAt.getTime(),
    });

    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  RefreshToken.init({
    token: DataTypes.STRING,
    iat: DataTypes.BIGINT,
    tokenId: DataTypes.STRING,
    expires: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });
  return RefreshToken;
};