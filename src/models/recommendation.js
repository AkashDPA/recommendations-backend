export default (sequelize, DataTypes) => {
    const Recommendation = sequelize.define(
        "Recommendation",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            caption: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            category: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn("now"),
            },
        },
        {
            tableName: "recommendations",
            timestamps: false,
        }
    );

    Recommendation.associate = (models) => {
        Recommendation.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
            onDelete: "CASCADE",
            timestamps: false,
        });

        Recommendation.belongsToMany(models.Collection, {
            through: "collection_recommendations_mapping",
            foreignKey: "recommendation_id",
            as: "collections",
            timestamps: false,
        });
    };

    return Recommendation;
};
