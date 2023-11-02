import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class vitri extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    vitri_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_vi_tri: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tinh_thanh: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    quoc_gia: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hinh_anh: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vitri',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "vitri_id" },
        ]
      },
    ]
  });
  }
}
