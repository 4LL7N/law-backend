import { Request,Response } from "express";
import Contact from "../models/Contact";
import { date } from "zod";
import { Promise } from "mongoose";

export const createContact = async (req:Request,res:Response) => {
    try{
    const contact = await Contact.create(req.body)
    res.status(201).json({
        message:"Message sent",
        data:contact
    })
}catch(err){
    console.log(err);
    
}
    
}

export const getAllContact =  async (req:Request,res:Response) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.page) || 10
    const skip = (page-1)*limit

    
try{
    const messages = await Contact.find().skip(skip).limit(limit)
    const total = await Contact.countDocuments()
    

    res.status(200).json({
        page,
        limit,
        total,
        totalPages:Math.ceil(total/limit),
        data:messages
    })
}catch(err){
    console.log(err);
    
}
}