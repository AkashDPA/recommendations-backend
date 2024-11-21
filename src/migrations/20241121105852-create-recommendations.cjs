/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("recommendations", {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            caption: {
                type: Sequelize.TEXT,
            },
            category: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("recommendations");
    },
};
