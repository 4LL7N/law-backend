import mongoose from "mongoose";


const teamSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    posiotiona:{
        type:String,
        require:true
    },
    subheading:{
        type:String,
    },
    email:{
        type:String,
        require:true
    },
    number:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    bio:{
        type:String,
    },
    services:[{type:String}],
    image:{
        type:String,
        require:true
    }
},{timestamps:true})

const Team = mongoose.model('Team',teamSchema)

export default Team