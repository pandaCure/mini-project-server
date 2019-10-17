module.exports = (sequelize, DataTypes) => {
  const PictureTag = sequelize.define(
    'PictureTag',
    {
      picture_tag_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        comment: '照片-标签关联ID'
      }
    },
    {
      sequelize,
      modelName: 'PictureTag',
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  )
  return PictureTag
}
