import departmentModel from "../../../DB/models/department.model.js";
import userModel from "../../../DB/models/user.model.js";
export const addDepartment = async(req,res,next) => {
    try{
        const{name}=req.body;
        const department = await departmentModel.create({name});
        return res.json({message:"success",department});
    }catch(err){
        return res.json({message:"error",err});
    }
}
export const addUser = async(req,res,next)=>{
    const { name, email, password, phoneNumber, role, depId,officeHours} = req.body;
    return res.json("ok")
    
}