import { Schema,Types,model } from "mongoose";
const chatSchema = new Schema(
  {
    isGroup: {
      type: Boolean,
      default: true,
    },
    users: [
      {
        type:Types.ObjectId,
        ref: "student",
      },
    ],
    letestMessage: {
      type:Types.ObjectId,
      ref: "message",
    },
    groupAdmin: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  
  { timestamps: true}, 
);

const chatModel = model("chat", chatSchema);
export default chatModel;
 