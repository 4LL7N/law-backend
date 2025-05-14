import { Request,Response } from "express";
import bcryptjs from  "bcryptjs"
import Admin from "../models/Admin";
import { generateToken } from "../utils/jwt";

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

    const token = generateToken(admin._id.toString())

    res.cookie("token",token,{
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

    const token = generateToken(admin._id.toString())

    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV != "developmet",
        sameSite:true
    })

    res.status(200).json({
        message:'admin logged in successfuly',
        token
    })
}