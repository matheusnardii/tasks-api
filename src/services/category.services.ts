import { prisma } from "../database/prisma";
import { TCategory, TCategoryCreate } from "../schemas/category.schema";

export class CategoryServices {
    async create(userId: number, body: TCategoryCreate, ): Promise<TCategory> {
        const newCategory = { ...body, userId}

        const data = await prisma.category.create({ data: newCategory });

        return data;
    }

    async delete(id: number): Promise<void> {
        
        await prisma.category.delete({ where: { id } });
    }
}