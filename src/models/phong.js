import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class phong extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    room_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_phong: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    khach: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phong_ngu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    giuong: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phong_tam: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mo_ta: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gia_tien: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    may_giat: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ban_la: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    tivi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dieu_hoa: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    bep: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    do_xe: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ho_boi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ban_ui: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    hinh_anh: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    vitri_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vitri',
        key: 'vitri_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'phong',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "room_id" },
        ]
      },
      {
        name: "vitri_id",
        using: "BTREE",
        fields: [
          { name: "vitri_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
