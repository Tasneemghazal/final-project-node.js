import { Router } from "express";
import * as Super from"./super.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { role } from "../../utils/role.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const superRouter = Router();

superRouter.post('/reject',auth([role.supervisor]),asyncHandler(Super.reject))
superRouter.post('/confirm',auth([role.supervisor]),asyncHandler(Super.confirm))

export default superRouter;