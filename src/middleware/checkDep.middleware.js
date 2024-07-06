import departmentModel from "../../DB/models/department.model.js";
import { AppError } from "../utils/AppError.js";

export const checkDep = async (req, res,next) => {
    const{depId}=req.body;
    const existingDepartment = await departmentModel.findById(depId);
    if (!existingDepartment) {
        return next(new AppError("Department does not exist", 500 ));
      }
  next();
}