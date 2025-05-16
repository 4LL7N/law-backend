import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
        default:null
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    content:{
        type:String,
        required:true
    },

},{timestamps:true})

commentSchema.index({blogId:1,createdAt:-1})
commentSchema.index({parentId:1})

const Comment = mongoose.model('Comment',commentSchema)

export default Comment