const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
/*     id: {
      type: DataTypes.INTEGER,
      autoincrement: true,
      primaryKey: true
    }, */
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    stepBYstep: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
    }

  },
  {
    timestamps: false
  });
};
