import { Router } from "express";
import { register, login } from "./authentication.controller";
import { loginValidation, registerValidation } from "./authentication.validations";

const router = new Router();

router.post("/login", loginValidation, login);

router.post("/register", registerValidation, register);

export default router;
