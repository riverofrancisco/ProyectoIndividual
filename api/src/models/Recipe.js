const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healt_score: {
      type: DataTypes.INTEGER
    },
    stepTOstep: {
      type: DataTypes.STRING
    },

  });
};
