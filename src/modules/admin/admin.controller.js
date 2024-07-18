import departmentModel from "../../../DB/models/department.model.js";
import studentModel from "../../../DB/models/student.model.js";
import userModel from "../../../DB/models/user.model.js";
import cloudinary from "../../utils/cloudinary.js";
import bcrypt from "bcrypt";
export const addDepartment = async (req, res, next) => {
    const { name } = req.body;
    const department = await departmentModel.create({ name });
    return res.status(201).json({ message: "success", department });
};
export const getDepartments = async (req, res, next) => {
    const deps = await departmentModel.find().select('name -_id');
    return res.status(200).json({ message: "success", deps });
};
export const deleteDepartment = async (req, res, next) => {
    const { id } = req.params;
    const dep = await departmentModel.deleteOne({ _id: id });
    if (!dep.deletedCount) {
    return res.status(200).json({ message: "department not found" });
    }
    return res.status(200).json({ message: "success", dep });
};
export const addUser = async (req, res, next) => {
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

};
export const getUsers = async (req, res, next) => {
  const users = await userModel.find({ _id: { $ne: req.userId } }).populate({
    path: 'depId',
    select: 'name -_id'
}).select('name email officeHours img phoneNumber depId');
    return res.status(200).json({ message: "success", users });
};

export const updateUser = async (req, res, next) => {
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
    return res.status(200).json({ message: "success", supervisor });
};
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.deleteOne({ _id: id });
    if (!user.deletedCount) {
      res.status(200).json({ message: "user not found" });
    }
    await cloudinary.uploader.destroy(user.img.secure_url);
    return res.status(200).json({ message: "success", user });
};
export const addStudent = async (req, res, next) => {
    const { name, email, password, phoneNumber, depId, academicYear, universityNum } = req.body;
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "final-project" / "user" / name,
    });
    const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    const user = await studentModel.create({
      name,
      email,
      password: hash,
      phoneNumber,
      depId,
      academicYear,
      universityNum,
      img:secure_url
    });
    return res.status(201).json({ message: "Student created successfully", user });
};
export const getStudents = async (req, res, next) => {
    const students = await studentModel.find().populate({
      path: 'depId',
      select: 'name -_id'
  }).select('name email universityNum img phoneNumber depId');
    res.status(200).json({ message: "success", students });
};
export const deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  const user = await studentModel.deleteOne({ _id: id });
  if (!user.deletedCount) {
    res.status(200).json({ message: "user not found" });
  }
  await cloudinary.uploader.destroy(user.img.secure_url);
  return res.status(200).json({ message: "success", user });
};
export const getUser= async (req,res,next) => {
    const { id } = req.params;
    const user = await userModel.findById(id).populate({
      path: 'depId',
      select: 'name -_id'
  }).select('name email officeHours img phoneNumber depId');;
    if(!user){
      return res.json({message :"No user"});
    }
    return res.status(200).json({ message: "success", user });
}
export const getStudent = async (req, res, next) => {
    const { id } = req.params;
    const user = await studentModel.findById(id).populate({
      path: 'depId',
      select: 'name -_id'
  }).select('name email universityNum img phoneNumber depId');;
    if(!user){
      return res.json({message :"No student"});
    }
    return res.status(200).json({ message: "success", user });
};