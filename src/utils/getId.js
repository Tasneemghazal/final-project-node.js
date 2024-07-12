import studentModel from "../../DB/models/student.model.js";
export const getStudent=async(universityNum)=>{
    const id=await studentModel.findOne({universityNum}).select("_id")
    return id;
}