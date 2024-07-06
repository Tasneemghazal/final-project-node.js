import { model, Schema, Types } from "mongoose";
const requestSchema = new Schema(
  {
    students:{
      type:[{type: Types.ObjectId,ref:"student"}],
      required:false,
    },
    sectionId: {
      type: Types.ObjectId,
      ref: "section",
    },
    studentId: {
      type: Types.ObjectId,
      ref: "student",
    },
    state:{
      type:String,
      default:"Pending"
    }
   
    
  },
  { timestamps: true }
);
const requestModel = model("request", requestSchema);
export default requestModel;