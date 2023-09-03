const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection.js");

// compares encrypted password with entered password
class User extends Model {
  checkPassword(entered_password) {
    return bcrypt.compareSync(entered_password, this.user_password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    joined_on: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
      /* validate: {
        len: [6],
      }, */
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  // encrypts passwords for protection
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.user_password = await bcrypt.hash(
          newUserData.user_password,
          10
        );
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.user_password = await bcrypt.hash(
          updatedUserData.user_password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;