import { z } from "zod";
import { categorySchema } from "./category.schema";

const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().nullish(),
    userId: z.number().positive()
});


export const returnCategorySchema = taskSchema.extend({ category: categorySchema.nullish() }).omit({ categoryId: true });

export const taskCreateSchema = taskSchema.omit({ id: true, userId: true });

export const taskUpdateSchema = taskCreateSchema.partial();

export type TTask = z.infer<typeof taskSchema>;

export type TTaskCreate = z.infer<typeof taskCreateSchema>;

export type TTaskUpdate = z.infer<typeof taskUpdateSchema>;

export type TCategoryReturn = z.infer<typeof returnCategorySchema>;