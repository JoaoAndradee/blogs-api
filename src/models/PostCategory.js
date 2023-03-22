module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blot_posts',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    }
  }, {
    timestamps: false,
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
      other: 'postId',
    })
  }

  return PostCategory;
}
