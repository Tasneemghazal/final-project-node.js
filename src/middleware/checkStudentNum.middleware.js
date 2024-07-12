import studentModel from "../../DB/models/student.model.js";
import { AppError } from "../utils/AppError.js";
export const checkStudentNum=async(req,res,next) => {
    const{universityNum}=req.body;
    const existingUserNum = await studentModel.findOne({ universityNum});
    if (existingUserNum) {
        return next(new AppError("student already exist", 409));
    }
    next();
}
