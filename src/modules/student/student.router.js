import { Router } from "express";
import * as Student from "./student.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { role } from "../../utils/role.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { checkSection } from "../../middleware/checkSection.middleware.js";
import uploadFile, { fileTypes } from "../../utils/multer.js";
const stdRouter = Router();

stdRouter.post(
  "/book",
  auth([role.student]),
  asyncHandler(Student.bookSection)
);
stdRouter.get(
  "/getSection",
  auth([role.student]),
  asyncHandler(Student.getStudentSection)
);
stdRouter.get(
  "/getTask",
  auth([role.student]),
  checkSection,
  asyncHandler(Student.getStudentTask)
);
stdRouter.post(
  "/submit/:taskId/:sectionId",
  auth([role.student]),uploadFile(fileTypes.pdf).single("file"),
  asyncHandler(Student.submitTask)
);
export default stdRouter;
