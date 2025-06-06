import jwt from "jsonwebtoken"

export const generateToken = (id:string)=>{
    return jwt.sign({id},process.env.JWT_SECRET!,{
        expiresIn:"1d"
    })
}

export const generateRefreshToken = (adminId:string) => {
    return jwt.sign({id:adminId},process.env.REFRESH_TOKEN_SECRET!,{expiresIn:'7d'})
}