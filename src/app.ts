import express, { json } from "express";
import "reflect-metadata";
import "dotenv"
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import { taskRouter } from "./routes/task.routes";
import { categoryRouter } from "./routes/category.routes";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { userRouter } from "./routes/user.routes";

export const app = express();

app.use(helmet());

app.use(cors());

app.use(json());

app.use("/tasks", taskRouter);

app.use("/categories", categoryRouter);

app.use("/users", userRouter);

app.use(handleErrors);