import { z } from "zod";


export const commentSchema = z.object({
    name:z.string().min(1),
    email:z.string().email().optional(),
    content:z.string().min(1),
    parentId:z.string().optional(),
})