const Sequelize = require('sequelize')
const { sequelize } = require('../config/sequelize')
const { Model } = Sequelize
class Picture extends Model {}
Picture.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      comment: '照片ID'
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: '照片名字'
    },
    time: {
      type: Sequelize.DATE,
      allowNull: false,
      comment: '照片拍摄时间'
    },
    province: {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: '拍摄照片所属省'
    },
    city: {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: '拍摄照片所属市'
    },
    region: {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: '拍摄照片所属区'
    },
    location: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: '拍摄照片所属地区'
    },
    description: {
      type: Sequelize.TEXT,
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
Picture.sync()
