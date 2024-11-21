/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            fname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            sname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            profile_picture: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            bio: {
                type: Sequelize.TEXT,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
    },
};
