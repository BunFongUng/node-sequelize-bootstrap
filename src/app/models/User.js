/* eslint no-use-before-define: */
export default (db, { ENUM, INTEGER, STRING }) => db.define("User", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uniqId: {
    type: STRING(150),
    unique: true,
    allowNull: false,
  },
  username: {
    type: STRING(150),
    allowNull: false,
    unique: true,
  },
  email: {
    type: STRING(150),
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING(150),
    allowNull: false,
  },
  fullName: {
    type: STRING(150),
  },
  status: {
    type: ENUM("active", "banned", "inactive", "pending"),
    allowNull: false,
    defaultValue: "inactive",
  },
}, {
  name: { singular: "user", plural: "users" },
  classMethods: {
    defineRelationship,
  },
});

function defineRelationship({ Role, User }) {
  User.belongsTo(Role, {
    foreignKey: { name: "roleId", allowNull: false },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
}
