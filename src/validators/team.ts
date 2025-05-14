import { z } from "zod";

export const teamSchema = z.object({
    name:z.string().min(1),
    position:z.string().min(1),
    subhead:z.string().optional(),
    email:z.string().email(),
    linkedin:z.string().url().optional(),
    bio:z.string().optional(),
    services:z.array(z.string()).optional(),
    image:z.string()
})