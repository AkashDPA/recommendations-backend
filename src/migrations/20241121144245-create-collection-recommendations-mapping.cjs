/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("collection_recommendations_mapping", {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            collection_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "collections",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            recommendation_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "recommendations",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("collection_recommendations_mapping");
    },
};
