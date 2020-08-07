'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Posts', [{
                title: "title post",
                content: "content post",
                tags: "home,post",
                status: "publish",
                AuthorId: 1
            },
            {
                title: "title post 2",
                content: "content post 2",
                tags: "home,post, lain",
                status: "not publish",
                AuthorId: 1
            }
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Posts', null, {});
    }
};