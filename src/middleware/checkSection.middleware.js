import sectionModel from "../../DB/models/section.model.js";
import { AppError } from "../utils/AppError.js";
export const checkSection=async(req,res,next) => {
    const section = await sectionModel.findOne({ students: req.userId });
    if (!section) {
        return next(new AppError("student doesn't assign to any section", 409));
    }
    next();
}
