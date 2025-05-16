import mongoose from "mongoose"
import { title } from "process"
import slugify from "slugify"

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    tags:[{type:String}],
    author:{
        type:String,
        required:true
    },
    images:[{type:String}],
    subtitle:{
        type:String
    },
    socialLinks:[{type:String}],
    content:{
        type:String,
        required:true
    },
    lawWays:{
        type:String,
        required:true
    },
},{timestamps:true})

blogSchema.pre('save',function(next){
    if(this.slug){
        this.slug = slugify(this.title,{lower:true,strict:true})
    }
    next()
})

blogSchema.index({title:'text',content:"text"})
blogSchema.index({category:1})
blogSchema.index({tags:1})

const Blog = mongoose.model('Blog',blogSchema)

export default Blog