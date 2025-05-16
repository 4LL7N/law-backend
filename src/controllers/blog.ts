import { Request,Response } from "express";
import slugify from "slugify";
import Blog from "../models/Blog";
import { json } from "stream/consumers";

interface BlogFilters {
    category?:string,
    tags?:{
        $in:string[]
    },
    search?:{
        $search:string
    },
    page?:number,
    limit?:number
}

export const createBlog = async (req:Request,res:Response) => {
    const slug = slugify(req.body.title,{lower:true,strict:true})
    const exists = await Blog.findOne({slug})
    if(exists){
        res.status(400).json({
            message:'Blog with same title already'
        })
        return
    }
    const blog = await Blog.create({...req.body,slug})
    res.status(201).json(blog)
}

export const getAllBlogs = async (req:Request,res:Response) => {
    const {category,tags,search,page=1,limit=6} = req.query
    const filter:BlogFilters = {}
    if(category) filter.category = category as string
    if(tags)filter.tags = {$in:(tags as string).split('.')}
    if(search)filter.search = {$search:search as string}

    const skip = (Number(page)-1)*Number(limit)
    const blogs = await Blog.find(filter).sort({createdAt:-1}).skip(skip).limit(Number(limit))
    const total = await Blog.countDocuments(filter)

    res.status(200).json({
        page:Number(page),
        total,
        totalPages:Math.ceil(total/Number(limit)),
        data:blogs
    })

}

export const getBlogBySlug = async (req:Request,res:Response) => {
    const blog = await Blog.findOne({slug:req.params.slug})
    if(!blog){
         res.status(404).json({
            message:'Blog not found'
        })
        return
    }
    res.status(200).json(blog)
}

export const updateBlog = async (req:Request,res:Response) => {
    const update = await Blog.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!update){
        res.status(404).json({
            messsage:"Blog not found"
        })
        return
    }
    res.status(200).json(update)
}

export const deleteBlog = async (req:Request,res:Response) => {
    const deleteBlog = await Blog.findByIdAndDelete(req.params.id)
    if(!deleteBlog){
        res.status(404).json({
            messsage:"Blog not found"
        })
        return
    }
    res.status(200).json({
        message:"Blog deleted successfully"
    })
}

export const getBlogWithNav = async (req:Request,res:Response) => {
    const current = await Blog.findOne({slug:req.params.slug})
    if(!current){
        res.status(404).json({
            message:'Blog not found'
        })
        return
    }

    const previous = await Blog.findOne({createdAt:{$gt:current.createdAt}}).sort({createdAt:1}).select('title slug')

    const next = await Blog.findOne({createdAt:{$lt:current.createdAt}}).sort({createdAt:-1}).select('title slug')

    res.status(200).json({
        current,
        previous,
        next
    })

}