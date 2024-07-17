import { Router } from "express";
import * as Super from "./super.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { role } from "../../utils/role.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import uploadFile, { fileTypes } from "../../utils/multer.js";
const superRouter = Router();

superRouter.post(
  "/reject",
  auth([role.supervisor]),
  asyncHandler(Super.reject)
);
superRouter.post(
  "/confirm",
  auth([role.supervisor]),
  asyncHandler(Super.confirm)
);
superRouter.get(
  "/getSections",
  auth([role.supervisor]),
  asyncHandler(Super.getMySections)
);
superRouter.post(
  "/addTask",
  auth([role.supervisor]),uploadFile(fileTypes.pdf).single("file"),
  asyncHandler(Super.assignTask)
);
superRouter.get(
  "/getTask/:id",
  auth([role.supervisor]),
  asyncHandler(Super.getTaskById)
);
export default superRouter;
