import studentModel from "../../../DB/models/student.model.js";
import userModel from "../../../DB/models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../../utils/AppError.js";
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({
          email,
        });
        if (!user) {
          user = await studentModel.findOne({
            email: email,
          });
        }
        if (!user) {
          return next(new AppError("invalid account",404 ));
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return next(
            new AppError("invalid account error in password", 400)
          );
        }
        let tokenPayload = {
          _id: user._id,
          email: user.email,
          name: user.name,
          depId:user.depId,
          img:user.img,
          phoneNumber:user.phoneNumber,
          role:user.role
        };
        if (user instanceof studentModel) {
          tokenPayload.academicYear = user.academicYear;
        } else {
          tokenPayload.officeHours = user.officeHours;
        }
        const token = jwt.sign(
          tokenPayload,
          process.env.LOGINTOKEN,
          {
            expiresIn: 60 * 60 * 24 * 7 ,
          }
        );
        return res.status(200).json({ message: "valid account", token, role: user.role });
      } catch (err) {
        next(new Error(err.message, { cause: 500 }));
      }
};
