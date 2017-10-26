import bcrypt from "bcrypt";
import shortid from "shortid";
import uuid from "uuid";
import { pick } from "lodash";
import { validationResult } from "express-validator/check";

import app from "../../../bootstrap/app";

export const login = async (req, res) => { // eslint-disable-line
  let errors = validationResult(req); // eslint-disable-line

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "error",
      data: null,
      errors: errors.mapped(),
    });
  }

  res.ok("Logged In");
};

export const register = async (req, res) => { // eslint-disable-line

  let errors = validationResult(req); // eslint-disable-line

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "error",
      data: null,
      errors: errors.mapped(),
    });
  }

  const { body } = req;
  const { Role, User } = app.db.models;
  const { email, fullName, password } = body;
  const [username] = email.split("@");

  const transaction = await app.db.transaction();

  try {
    let [role] = await Role.findOrCreate({
      where: { accessLevel: "basic" },
      defaults: { accessLevel: "basic" },
      transaction,
    });

    role = role.toJSON();

    let user = await User.create({
      email,
      fullName: fullName.trim(),
      password: await bcrypt.hash(password, 10),
      roleId: role.id,
      status: "inactive",
      uniqId: uuid.v4().replace(/-/g, ""),
      username: `${username}.${shortid.generate()}`,
    }, { transaction });

    user = user.toJSON();
    transaction.commit();
    res.json({
      status: "success",
      data: { ...pick(user, ["email", "fullName", "username"]) },
      error: null,
    });
  } catch (error) {
    transaction.rollback();
    res.status(500).json({
      status: "error",
      data: null,
      error,
    });
  }
};

export default { register, login };
