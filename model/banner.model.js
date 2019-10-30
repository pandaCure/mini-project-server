module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define(
    'Banner',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        comment: '小程序BannerID'
      },
      url: {
        type: DataTypes.STRING(350),
        allowNull: false,
        comment: '照片地址'
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Banner生效时间'
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Banner失效时间'
      },
      description: {
        type: DataTypes.TEXT,
        comment: 'Banner描述'
      },
      publish: {
        type: DataTypes.ENUM('published', 'unpublished'),
        allowNull: false,
        comment: '是否允许照片发布到小程序中'
      }
    },
    {
      sequelize,
      modelName: 'Banner',
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  )
  return Banner
}
