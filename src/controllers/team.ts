import { Request,Response } from "express";
import Team from "../models/Team";

export const getAllTeam = async (req:Request,res:Response) => {
    const teamMembers = await Team.find().sort({createAt:-1})
    res.status(200).json({
        teamMembers
    })
}

export const getTeamMember = async (req:Request,res:Response) => {
    const member = await Team.findById(req.params.id)
    if(!member){
        res.status(404).json({
            message:'no memeber with this id'
        })
        return
    }
    res.status(200).json({
        member
    })
}

export const creaetTeamMember = async (req:Request,res:Response) => {
    const createdMember = await Team.create(req.body)
    
    res.status(201).json({
        createdMember
    })
}

export const updateTeamMember = async (req:Request,res:Response) => {
    const updatedMember = await Team.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
    if(!updatedMember){
        res.status(404).json({
            message:'no memeber with this id'
        })
        return
    }
    
    res.status(200).json({
        updatedMember
    })
}

export const deleteTeamMember = async (req:Request,res:Response) => {
    const deletedMember = await Team.findByIdAndDelete(req.params.id)
    
    if(!deletedMember){
        res.status(404).json({
            message:'no memeber with this id'
        })
        return
    }
    res.status(202).json({
        deletedMember,
        message:"member deleted successfuly"
    })
}