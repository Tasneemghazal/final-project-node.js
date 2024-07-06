import userModel from "../../../DB/models/user.model.js";

export const signUp = async(req,res,next)=>{
const{userName,email,password} = req.body;
const user = await userModel.create({userName:userName,email:email,password:password});
return res.json(user)
}