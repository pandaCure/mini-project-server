const Sequelize = require('sequelize')
const { sequelize } = require('../config/sequelize')
const { Model } = Sequelize
class PictureTag extends Model {}
PictureTag.init(
  {
    picture_tag_id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      comment: '照片-标签关联ID'
    },
    pructure_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        modal: 'picture',
        key: 'id'
      },
      comment: '照片ID'
    },
    tag_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        modal: 'tag',
        key: 'id'
      },
      comment: '标签ID'
    }
  },
  {
    sequelize,
    modelName: 'picture_tag',
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
)
PictureTag.sync()
module.exports = PictureTag
