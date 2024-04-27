import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsCategoryOwner {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const userId = res.locals.decode.id;

        const categoryId = req.params.id;

        const category = await prisma.category.findFirst({ where: { id: Number(categoryId) } });

        if(category?.userId !== userId){
            throw new AppError(403, "User is not the owner of this category");
        }

        next();
    }
}