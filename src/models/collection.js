export default (sequelize, DataTypes) => {
    const Collection = sequelize.define(
        "Collection",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn("now"),
            },
        },
        {
            tableName: "collections",
            timestamps: false,
        }
    );

    Collection.associate = (models) => {
        Collection.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
            onDelete: "CASCADE",
            timestamps: false,
        });

        Collection.belongsToMany(models.Recommendation, {
            through: "collection_recommendations_mapping",
            foreignKey: "collection_id",
            as: "recommendations",
            timestamps: false,
        });
    };

    return Collection;
};
