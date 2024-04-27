import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryControllers {
    constructor(@inject("CategoryServices") private categoryServices: CategoryServices) {}

    async create(req: Request, res: Response) {

        console.log(res.locals.decode);

        const userId = res.locals.decode.id;
        
        const response = await this.categoryServices.create(userId, req.body);

        return res.status(201).json(response);
    }

    async delete(req: Request, res: Response) {

        await this.categoryServices.delete(Number(req.params.id));


        return res.status(204).json();
    }
}