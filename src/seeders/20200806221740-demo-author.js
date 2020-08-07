'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Authors', [{
            username: 'John',
            password: 'Doe',
            salt: '-',
            profile: 'next profile',
            email: 'example@example.com',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Authors', null, {});
    }
};