import chatModel from "../../../DB/models/chat.model.js";
import messageModel from "../../../DB/models/message.model.js";
import studentModel from "../../../DB/models/student.model.js";
import userModel from "../../../DB/models/user.model.js";

export const sendMessage = async (req, res, next) => {
  let newMessage = null;
  const { content } = req.body;
  const role = [req.role];
  const senderField = role.includes("student") ? "senderStd" : "senderSuper";
  newMessage = {
    [senderField]: req.userId,
    content,
    chat: req.params.id,
  };

  let currMessage = await messageModel.create(newMessage);
  currMessage = await messageModel.findById(currMessage._id).populate([
    {
      path: "chat",
    },
    {
      path: senderField,
    },
  ]);
  currMessage = await studentModel.populate(currMessage, {
    path: "chat.users",
  });
  currMessage = await userModel.populate(currMessage, {
    path: "chat.groupAdmin",
  });
  await chatModel.findByIdAndUpdate(req.params.id, {
    latestMessage: currMessage,
  });

  return res.status(200).json(currMessage);
};
export const getMessages = async (req, res, next) => {
    let messages = await messageModel.find({ chat: req.params.id});
    for (let msg of messages) {
      messages = await studentModel.populate(messages, {
        path: "senderStd",
        select: "_id name email",
      });
      messages = await userModel.populate(messages, {
        path: "senderSuper",
        select: "_id name email",
      });
    }
    return res.status(200).json({ message: "success", messages });
};
