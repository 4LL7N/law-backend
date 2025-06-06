import { Request,Response } from "express";
import bcryptjs from  "bcryptjs"
import Admin from "../models/Admin";
import { generateRefreshToken, generateToken } from "../utils/jwt";
import  jwt  from "jsonwebtoken";


export const register = async (req:Request,res:Response)=>{
    const {email,password} = req.body

    const existingAdmin = await Admin.findOne({email})
    if(existingAdmin){
        res.status(400).json({
            message:"Admin already exists"
        })
        return
    }
    const hashedPassword = await bcryptjs.hash(password,10)

    const admin = await Admin.create({
        email,
        password:hashedPassword
    })

    // const token = generateToken(admin._id.toString())
    const accessToken = generateToken(admin._id.toString())
    const refreshToken = generateRefreshToken(admin._id.toString())

    admin.refreshToken = refreshToken
    await admin.save()

    // res.cookie('token',token,{
    //     httpOnly:true,
    //     secure:process.env.NODE_ENV != "developmet",
    //     sameSite:true
    // })

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV != 'developmet',
        sameSite:'lax'
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV != 'developmet',
        sameSite:'lax'
    })

    res.status(201).json({
        message:"Admin registerd successfuly"
    })
}

export const login = async (req:Request,res:Response)=>{
    const {email,password} = req.body

    const admin = await Admin.findOne({email})
    if(!admin){
        res.status(401).json({
            message:'Invalid credentials'
        })
        return
    }
    const match = await bcryptjs.compare(password,admin.password!)

    if(!match){
        res.status(401).json({
            message:"invalid credentials"
        })
    }

    // const token = generateToken(admin._id.toString())

    const accessToken = generateToken(admin._id.toString())
    const refreshToken = generateRefreshToken(admin._id.toString())

    admin.refreshToken = refreshToken
    await admin.save()
    // res.cookie('token',token,{
    //     httpOnly:true,
    //     secure:process.env.NODE_ENV != "developmet",
    //     sameSite:true
    // })

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV != 'developmet',
        sameSite:'lax'
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV != 'developmet',
        sameSite:'lax'
    })

    res.status(200).json({
        message:'admin logged in successfuly',
        accessToken,
        refreshToken
    })
}

export const refreshToken = async (req:Request,res:Response)=>{

    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        res.status(401).json({
            message:"Unauthorized"
        })
        return
    }
    let payload :any
    try{
        payload = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET!)
    }catch(err){
        res.status(401).json({
            message:"Unauthorized"
        })
        return
    }
    
    const admin = await Admin.findById(payload.id)

    if(!admin ||  admin.refreshToken != refreshToken){
        res.status(401).json({
            message:"refersh token missmatch"
        })
        return
    }

    const newAccessToken = generateToken(admin._id.toString())
    res.cookie("accessToken",newAccessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV != 'developmet',
        sameSite:'lax'
    })

    res.status(200).json({message:'Token refreshed'})
}