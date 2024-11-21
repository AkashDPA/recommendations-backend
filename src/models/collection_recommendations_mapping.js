export default (sequelize, DataTypes) => {
    const CollectionRecommendationsMapping = sequelize.define(
        "CollectionRecommendationsMapping",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            collection_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            recommendation_id: {
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
            tableName: "collection_recommendations_mapping",
            timestamps: false,
        }
    );

    return CollectionRecommendationsMapping;
};
