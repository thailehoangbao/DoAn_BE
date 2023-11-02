import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _comments from  "./comments.js";
import _orders from  "./orders.js";
import _phong from  "./phong.js";
import _users from  "./users.js";
import _vitri from  "./vitri.js";

export default function initModels(sequelize) {
  const comments = _comments.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const phong = _phong.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);
  const vitri = _vitri.init(sequelize, DataTypes);

  comments.belongsTo(phong, { as: "room", foreignKey: "room_id"});
  phong.hasMany(comments, { as: "comments", foreignKey: "room_id"});
  orders.belongsTo(phong, { as: "room", foreignKey: "room_id"});
  phong.hasMany(orders, { as: "orders", foreignKey: "room_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  phong.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(phong, { as: "phongs", foreignKey: "user_id"});
  phong.belongsTo(vitri, { as: "vitri", foreignKey: "vitri_id"});
  vitri.hasMany(phong, { as: "phongs", foreignKey: "vitri_id"});

  return {
    comments,
    orders,
    phong,
    users,
    vitri,
  };
}
