import { Request, Response } from "express";
import { TaskServices } from "../services/task.services";
import { inject, injectable } from "tsyringe";

@injectable()
export class TaskControllers {
    constructor(@inject("TaskServices") private taskServices: TaskServices) { }

    async create(req: Request, res: Response) {

        const id = res.locals.decode.id;

        const response = await this.taskServices.create(req.body, id);

        return res.status(201).json(response);
    }

    async getMany(req: Request, res: Response) {

        const { category } = req.query;

        const id = res.locals.decode.id;

        const response = await this.taskServices.getMany(id, category as string);

        return res.status(200).json(response);
    }

    async getOne(req: Request, res: Response) {

        const response = await this.taskServices.getOne(Number(req.params.id));

        return res.status(200).json(response);
    }

    async update(req: Request, res: Response) {

        const response = await this.taskServices.update(Number(req.params.id), req.body);

        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {

        await this.taskServices.delete(Number(req.params.id));

        return res.status(204).json();
    }
}