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
      url: {
        type: DataTypes.STRING(350),
        allowNull: false,
        comment: '照片地址'
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
      province_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '拍摄照片所属省code'
      },
      city: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '拍摄照片所属市'
      },
      city_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '拍摄照片所属市code'
      },
      region: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '拍摄照片所属区'
      },
      region_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '拍摄照片所属区code'
      },
      detail_address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '拍摄照片所属地区'
      },
      description: {
        type: DataTypes.TEXT,
        comment: '照片描述'
      },
      publish: {
        type: DataTypes.ENUM('published', 'unpublished'),
        allowNull: false,
        comment: '是否允许照片发布到小程序中'
      }
    },
    {
      sequelize,
      modelName: 'Picture',
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
