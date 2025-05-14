import { number, z } from "zod";


export const contactSchema = z.object({
    name:z.string().min(1),
    email:z.string().email(),
    number:z.string().min(5).max(15),
    message:z.string().min(10)
})