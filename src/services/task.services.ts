import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TCategoryReturn, TTask, TTaskCreate, TTaskUpdate, returnCategorySchema } from "../schemas/task.schema";

@injectable()
export class TaskServices {
    async create(body: TTaskCreate, userId: number): Promise<TTask> {
        const newTask = { ...body, userId };

        const data = await prisma.task.create({ data: newTask });

        return data;
    }

    async getMany(userId: number, category?: string): Promise<TCategoryReturn[]> {
        if (category) {
            const data = await prisma.task.findMany({
                where: { category: { name: { equals: category, mode: "insensitive" }, userId }, userId },
                include: { category: true }
            })

            return returnCategorySchema.array().parse(data);
        }

        const data = await prisma.task.findMany({ include: { category: true }, where: { userId } });

        return returnCategorySchema.array().parse(data);
    }

    async getOne(id: number) {
        const data = await prisma.task.findFirst({ where: { id }, include: { category: true } });

        return returnCategorySchema.parse(data);
    }

    async update(id: number, body: TTaskUpdate): Promise<TTask> {
        const data = await prisma.task.update({ where: { id }, data: body });

        return data
    }

    async delete(id: number): Promise<void> {
        await prisma.task.delete({ where: { id } });
    }
}