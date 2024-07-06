import departmentModel from "../../../DB/models/department.model.js";
import userModel from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";
import bcrypt from "bcrypt";
export const addDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    const department = await departmentModel.create({ name });
    return res.json({ message: "success", department });
  } catch (err) {
    return res.json({ message: "error", err });
  }
};
export const addUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, role, depId, officeHours } =
      req.body;
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "final-project" / "user" / name,
    });
    const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    let user = undefined;
    if (depId && officeHours) {
      user = await userModel.create({
        name,
        email,
        password: hash,
        phoneNumber,
        role,
        depId,
        officeHours,
        img: secure_url,
      });
    } else {
      user = await userModel.create({
        name,
        email,
        password: hash,
        phoneNumber,
        role,
        img,
      });
    }

    return res.status(201).json({ message: "success", user });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({ _id: { $ne: req.userId } });
    res.status(200).json({ message: "success", users });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, depId, role, officeHours, phoneNumber, password } =
      req.body;
    const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    const supervisor = await userModel.updateOne(
      { _id: id },
      { name, email, depId, role, officeHours, phoneNumber, password: hash }
    );
    if (!supervisor.modifiedCount) {
      return res.json({ message: "user not found" });
    }
    res.status(200).json({ message: "success", supervisor });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.deleteOne({ _id: id });
    if (!user.deletedCount) {
      res.status(200).json({ message: "user not found" });
    }
    await cloudinary.uploader.destroy(user.img.secure_url);
    res.status(200).json({ message: "success", user });
  } catch (err) {
    next(new AppError(err.message,500));
  }
};
