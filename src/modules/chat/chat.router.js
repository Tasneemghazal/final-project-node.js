import { Router } from "express";
import * as Chat from "./chat.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { role } from "../../utils/role.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const chatRouter = Router();

chatRouter.post("/send/:id",auth([role.student,role.supervisor]), asyncHandler(Chat.sendMessage));
chatRouter.get("/getMsg/:id",auth([role.student,role.supervisor]), asyncHandler(Chat.getMessages));

export default chatRouter;
