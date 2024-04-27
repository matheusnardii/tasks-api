import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/user.services";
import { UserControllers } from "../controllers/user.controller";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { userLoginBodySchema, userRegisterBodySchema } from "../schemas/user.schema";
import { ValidateToken } from "../middlewares/isTokenValid.middleware";
import { IsEmailUnique } from "../middlewares/isEmailUnique.middleware";

container.registerSingleton("UserServices", UserServices);

const userControllers = container.resolve(UserControllers);

export const userRouter = Router();

userRouter.post("/", ValidateBody.execute(userRegisterBodySchema), IsEmailUnique.execute,  (req, res) => userControllers.register(req, res));

userRouter.post("/login", ValidateBody.execute(userLoginBodySchema), (req, res) => userControllers.login(req, res));

userRouter.get("/profile", ValidateToken.execute, (req, res) => userControllers.getUser(req, res));