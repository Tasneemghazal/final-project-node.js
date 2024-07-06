import mongoose from "mongoose";


const connectDB = async()=>{
    mongoose.connect(process.env.DB).then(()=>{
        console.log("connection established");
    }).catch((err)=>{
        console.log(`error connecting ${err}`);
    })
}

export default connectDB;