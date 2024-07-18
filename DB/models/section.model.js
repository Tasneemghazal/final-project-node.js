import { model, Schema, Types } from "mongoose";
const sectionSchema = new Schema(
  {
    num: {
      type: String,
      required: true,
    },
    depId: {
      type: Types.ObjectId,
      ref: "department",
    },
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
    students:{
        type:[{type: Types.ObjectId,ref:"student"}],
        required:false,
    },
    visible:{
      type: Boolean,
      default:true
    },
    
  },
  { timestamps: true }
);
const sectionModel = model("section", sectionSchema);
export default sectionModel;