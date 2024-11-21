export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            fname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            profile_picture: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            bio: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn("now"),
            },
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Collection, {
            foreignKey: "user_id",
            as: "collections",
            timestamps: false,
        });

        User.hasMany(models.Recommendation, {
            foreignKey: "user_id",
            as: "recommendations",
            timestamps: false,
        });
    };

    return User;
};
