const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Note = sequelize.define('Note', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Note.associate = (models) => {
        Note.belongsTo(models.User);
    };

    return Note;
};
