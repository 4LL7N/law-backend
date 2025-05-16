import {z} from "zod"

export const blogSchema = z.object({
    title:z.string().min(3),
    category:z.string().min(3),
    content:z.string().min(10),
    author:z.string().min(1),
    image:z.array(z.string().url()).optional(),
    subtitle:z.string().optional(),
    socialLinks:z.array(z.string().url()).optional(),
    lawWays:z.string().min(3),
    tags:z.array(z.string()).optional(),
})

export const blogUpdateSchema = blogSchema.partial()