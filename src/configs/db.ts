import mongoose from "mongoose"

const connectDB = async () =>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URL!)
    console.log("mongoDB connected");
    }catch(err){
        if(err instanceof Error){
            console.log("Error: "+err.message)
        }else{
            console.log("unknown error");
            
        }
        process.exit(1)
    }
}

export default connectDB