import { z } from "zod";

export const carouselSchema = z.object({
    title:z.string().min(1),
    subtitle:z.string().min(1),
    image:z.string().url(),
    link1:z.string().url().optional(),
    link2:z.string().url().optional()
})

export const carouselEditSchema = z.object({
    title:z.string().min(1).optional(),
    subtitle:z.string().min(1).optional(),
    image:z.string().url().optional(),
    link1:z.string().url().optional(),
    link2:z.string().url().optional()
})

export default carouselSchema