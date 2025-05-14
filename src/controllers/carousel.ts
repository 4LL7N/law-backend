import { Request, Response } from "express";
import Carousel from "../models/Carousel";

export const getAllCarousel = async(_req:Request,res:Response)=>{
    const items =  await Carousel.find().sort({createdAt:-1}).limit(4)
    res.status(200).json({
        items
    })
}

export const createCarousel = async (req:Request,res:Response) =>{
    const item = await Carousel.create(req.body)    
    res.status(201).json({
        item
    })
}

export const updateCarousel = async (req:Request,res:Response)=>{
    const updateItem = await Carousel.findByIdAndUpdate(req.params.id,req.body,{new:true}) 
    
    if(!updateItem){
        res.status(404).json({
            message:"Carousel not found"
        })
        return
    }
    res.status(204).json({
        updateItem
    })
}

export const  deleteCarousel = async (req:Request,res:Response)=>{
    const deletedItem = await Carousel.findByIdAndDelete(req.params.id)
    if(!deletedItem){
        res.status(404).json({
            message:"Carousel not found"
        })
        return
    }
    res.status(200).json({
        message:"Carousel deleted successfuly"
    })
}