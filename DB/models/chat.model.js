import { Schema,Types,model } from "mongoose";
const chatSchema = new Schema(
  {
    users: [
      {
        type:Types.ObjectId,
        ref: "student",
      },
    ],
    groupAdmin: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  
  { timestamps: true}, 
);

const chatModel = model("chat", chatSchema);
export default chatModel;
 