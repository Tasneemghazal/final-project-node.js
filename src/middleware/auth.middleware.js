import jwt from "jsonwebtoken";
import studentModel from "../../DB/models/student.model.js";
import { AppError } from "../utils/AppError.js";
import userModel from "../../DB/models/user.model.js";

export const auth = (accessRoles = []) => {
  return async (req, res, next) => {
    try {
      let { token } = req.headers;
      if (!token || !token.startsWith(process.env.authBearerToken)) {
        return next(new AppError("Invalid token",400));
      }
      token = token.split("__")[1];
      const decoded = await jwt.verify(token, process.env.LOGINTOKEN);
      let user = await userModel.findOne({
        email: decoded.email,
      });
      if (!user) {
        user = await studentModel.findOne({
          email: decoded.email,
        });
      }
     
      if (!user) {
        return next(new AppError("User not found", 404));
      }

      const userRoles = Array.isArray(user.role) ? user.role : [user.role];
      if (!accessRoles.some(role => userRoles.includes(role))) {
        return next(new AppError("Unauthorized",401 ));
      }
      
      req.user = user;
      req.userId = decoded._id;
      req.depId = decoded.depId;
      req.img=decoded.img;
      req.role = decoded.role;
      next();
    } catch (err) {
      next(new AppError("Failed to authenticate", 400));
    }
  };
};