import studentModel from "../../DB/models/student.model.js";
import { AppError } from "../utils/AppError.js";

export const checkStudentEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await studentModel.findOne({ email });
  if (user) {
    return next(new AppError("email already exists", 409));
  }
  next();
};
