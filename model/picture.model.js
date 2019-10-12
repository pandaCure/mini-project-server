module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define(
    'Picture',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        comment: '照片ID'
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '照片名字'
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '照片拍摄时间'
      },
      province: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '拍摄照片所属省'
      },
      city: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '拍摄照片所属市'
      },
      region: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '拍摄照片所属区'
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '拍摄照片所属地区'
      },
      description: {
        type: DataTypes.TEXT,
        comment: '照片描述'
      }
    },
    {
      sequelize,
      modelName: 'picture',
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  )
  Picture.associate = function(models) {
    // associations can be defined here
    models.Picture.belongsToMany(models.Tag, {
      through: models.PictureTag
    })
  }
  return Picture
}
