import { Router } from "express";
import * as Student from"./student.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { role } from "../../utils/role.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const stdRouter = Router();

stdRouter.post('/book',auth([role.student]),asyncHandler(Student.bookSection))

export default stdRouter;