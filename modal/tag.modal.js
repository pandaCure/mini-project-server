const Sequelize = require('sequelize')
const { sequelize } = require('../config/sequelize')
const Picture = require('./picture.modal')
const PictureTag = require('./picture-tag.modal')
const { Model } = Sequelize
class Tag extends Model {}
Tag.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      comment: '标签ID'
    },
    key_word: {
      type: Sequelize.STRING(10),
      allowNull: false,
      comment: '标签描述'
    },
    text_color: {
      type: Sequelize.STRING(10),
      comment: '标签颜色'
    },
    bg_color: {
      type: Sequelize.STRING(10),
      comment: '标签背景颜色'
    },
    icon: {
      type: Sequelize.STRING,
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
Tag.belongsToMany(Picture, { through: PictureTag })
Tag.sync()
module.exports = Tag
