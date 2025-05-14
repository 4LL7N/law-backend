import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    subtitle:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    link1:{
        type:String
    },
    link2:{
        type:String
    }
},{timestamps:true})

const Carousel = mongoose.model('Carusel',carouselSchema)

export default Carousel