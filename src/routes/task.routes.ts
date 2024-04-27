import { Router } from "express";
import { TaskControllers } from "../controllers/task.controller";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schema";
import { IsTaskIdValid } from "../middlewares/isTaskIdValid.middleware";
import { IsCategoryValid } from "../middlewares/isCategoryValid.middleware";
import { IsTaskOwner } from "../middlewares/isTaskOwner.middleware";
import { ValidateToken } from "../middlewares/isTokenValid.middleware";
import { container } from "tsyringe";
import { TaskServices } from "../services/task.services";


export const taskRouter = Router();

container.registerSingleton("TaskServices", TaskServices);

const taskController = container.resolve(TaskControllers);

taskRouter.post("/", ValidateToken.execute, ValidateBody.execute(taskCreateSchema), IsCategoryValid.execute, (req, res) => taskController.create (req, res));

taskRouter.get("/", ValidateToken.execute, (req, res) => taskController.getMany(req, res));

taskRouter.use("/:id", ValidateToken.execute, IsTaskIdValid.execute, IsTaskOwner.execute,);

taskRouter.get("/:id", (req, res) => taskController.getOne(req, res));

taskRouter.patch("/:id", ValidateBody.execute(taskUpdateSchema), IsCategoryValid.execute, (req, res) => taskController.update(req, res));

taskRouter.delete("/:id", (req, res) => taskController.delete(req, res));