import { Router } from "express";
import { CategoryControllers } from "../controllers/category.controller";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schema";
import { IsCategoryValid } from "../middlewares/isCategoryValid.middleware";
import { container } from "tsyringe";
import { CategoryServices } from "../services/category.services";
import { ValidateToken } from "../middlewares/isTokenValid.middleware";
import { IsCategoryOwner } from "../middlewares/isCategoryOwner.middleware";


export const categoryRouter = Router();

container.registerSingleton("CategoryServices", CategoryServices);

const categoryController = container.resolve(CategoryControllers);

categoryRouter.post("/", ValidateToken.execute, ValidateBody.execute(categoryCreateSchema), (req, res) => categoryController.create(req, res));

categoryRouter.delete("/:id", ValidateToken.execute, IsCategoryValid.idParams, IsCategoryOwner.execute,  (req, res) => categoryController.delete(req, res));