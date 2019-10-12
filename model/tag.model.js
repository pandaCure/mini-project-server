module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        comment: '标签ID'
      },
      key_word: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: '标签描述'
      },
      text_color: {
        type: DataTypes.STRING(10),
        comment: '标签颜色'
      },
      bg_color: {
        type: DataTypes.STRING(10),
        comment: '标签背景颜色'
      },
      icon: {
        type: DataTypes.STRING,
        comment: '标签Icon'
      }
    },
    {
      sequelize,
      modelName: 'tag',
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  )
  Tag.associate = function(models) {
    // associations can be defined here
    models.Tag.belongsToMany(models.Picture, {
      through: models.PictureTag
    })
  }
  return Tag
}

// https://github.com/sequelize/sequelize/issues/10395
// https://cnodejs.org/topic/5b18e0678a4f51e140d94619
