module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    underscored: true,
  })

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'id', as: 'BlogPost'
    })
  }

  return User;
}
