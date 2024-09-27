const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        googleId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
    });

    return User;
};

