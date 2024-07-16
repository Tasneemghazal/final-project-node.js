import { Router } from "express";
import * as head from "./head.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { role } from "../../utils/role.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const headRouter = Router();

headRouter.post(
  "/addSection",
  auth([role.headOfDepartment]),
  asyncHandler(head.createSection)
);
headRouter.get("/getSection", auth([role.headOfDepartment]), asyncHandler(head.getHeadSections));
headRouter.delete("/deleteSec/:id", auth([role.headOfDepartment]), asyncHandler(head.deleteSection));

export default headRouter;
