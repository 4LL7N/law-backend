import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

export const requireAdmin = (req:Request,res:Response,next:NextFunction) => {
    const token = req.cookies.token
    if(!token){
        res.status(401).json({
            message:"Unauthorzed"
        })
        return
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET!) as JwtPayload
        (req as any).userId = decode.id
        next()
    }catch(err){
        res.status(401).json({message:"invalid or expired token"})
    }
}