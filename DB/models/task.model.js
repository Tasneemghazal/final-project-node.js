import { model, Schema, Types } from "mongoose";
const taskSchema = new Schema(
  {
    txt: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
    sections: {
      type:[{type: Types.ObjectId,ref:"section"}],
      required: true,
    },
    supervisor:{
      type: Types.ObjectId,
      ref:"user"
    },
    startDate:{
      type: Date,
      required: true,
    },
    endDate:{
      type: Date,
      required: true,
    },
    feedback:{
      type: String,
    }
    
   
  },
  { timestamps: true }
);
const taskModel = model("task",taskSchema);
export default taskModel;