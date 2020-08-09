'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Comments', [{
                content: "komen pertama",
                email: "subhan.dinda.putra@gmail.com",
                url: "/post/1",
                status: "publish",
                PostId: 1,
                AuthorId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                content: "komen kedua",
                email: "subhan.dinda.putra@gmail.com",
                url: "/post/2",
                status: "publish",
                PostId: 2,
                AuthorId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },

        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Comments', null, {});
    }
};