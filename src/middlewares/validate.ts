import { Request,Response,NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const validate = (schema:ZodSchema) => (req:Request,res:Response,next:NextFunction)=>{
    try{
        schema.parse(req.body)
        next()
    }catch(err){
        if(err instanceof ZodError){
            res.status(400).json({
                message:"Validation error",
                error:err.errors.map((err)=>{
                    path:err.path.join('.')
                })
            })
            return
        }else{
            res.status(400).json({message:'validation error'})
            return
        }
    }
}