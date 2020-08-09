'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {


        }
    };
    Comment.init({
        content: DataTypes.STRING,
        email: DataTypes.STRING,
        url: DataTypes.STRING,
        PostId: DataTypes.INTEGER,
        AuthorId: DataTypes.INTEGER,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};