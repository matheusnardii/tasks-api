import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsCategoryValid {
    static async execute(req: Request, res: Response, next: NextFunction) {

        if (!req.body.categoryId) {
            return next();
        }
        const id = req.body.categoryId

        const category = await prisma.category.findFirst({ where: { id: Number(id) } });
        if (!category) {
            throw new AppError(404, "Category not found");
        }

        return next();
    }

    static async idParams(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id

        const category = await prisma.category.findFirst({ where: { id: Number(id) } });

        if (!category) {
            throw new AppError(404, "Category not found");
        }

        return next();
    }

    static async categoryValid(req: Request, res: Response, next: NextFunction) {
        const query = req.query.category
        if (!query) {
            return next();
        }
        const category = await prisma.category.findMany({ where: { name: { equals: String(query), mode: "insensitive" } } });
        if (category.length == 0) {
            throw new AppError(404, "Category not found");
        }

        return next();
    }
}