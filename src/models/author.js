'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Author extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Post, { foreignKeyConstraint: true })
            this.hasMany(models.Comment, { foreignKeyConstraint: true });
        }

    };
    Author.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING,
        profile: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Author',
    });
    return Author;
};