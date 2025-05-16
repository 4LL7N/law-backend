import { Request,Response } from "express";
import Comment from "../models/Comment";

export const createComment = async (req:Request,res:Response)=>{
    const blogId = req.params.blogId
    const {name,email,content,parentId} = req.body
    const comment = await Comment.create({
        blogId,
        name,
        content,
        email:email||null,
        parentId:parentId||null    
    })

    res.status(201).json(comment)
}

export const getCommentByBlog = async (req:Request,res:Response)=>{
    const blogId = req.params.blogId

    const comments = await Comment.find({blogId}).sort({createdAt:-1}).lean()

    const grouped:Record<string,any> = {}

    const topLevel = comments.filter((c)=>!c.parentId)
    const replies = comments.filter((c)=> c.parentId)

    for(const reply of replies){
        const parent = reply.parentId.toString()
        if(!grouped[parent])grouped[parent] = []
        grouped[parent].push(reply)
    }

    const result = topLevel.map((comment)=>({
        ...comment,
        replies:grouped[comment._id.toString()]||[]
    }))

    res.status(200).json(result)
}

export const deleteComment = async (req:Request,res:Response)=>{
    const deleted = await Comment.findByIdAndDelete(req.params.commentId)
    if(!deleted){
        res.status(404).json({
            message:'Comment not found'
        })
        return
    }

    await Comment.deleteMany({parentId:req.params.commentId})
    res.status(200).json({message:'Comment deleted'})
}