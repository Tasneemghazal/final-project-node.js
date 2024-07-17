import requestModel from "../../../DB/models/request.model.js";
import sectionModel from "../../../DB/models/section.model.js";
import taskModel from "../../../DB/models/task.model.js";
import cloudinary from "../../utils/cloudinary.js";
export const reject = async (req, res, next) => {
  const request = await requestModel.findByIdAndUpdate(
    req.body.requestId,
    { state: "rejected" },
    { new: true }
  );
  await sectionModel.findByIdAndUpdate(req.body.sectionId, { visible: true });
  return res.status(201).json({ message: "success", request });
};
export const confirm = async (req, res, next) => {
  const { students } = await requestModel.findById(req.body.requestId);
  const request = await requestModel.findByIdAndUpdate(
    req.body.requestId,
    { state: "accept" },
    { new: true }
  );
  await sectionModel.findByIdAndUpdate(
    req.body.sectionId,
    { students, visible: false },
    { new: true }
  );
  return res.status(201).json({ message: "Success", request });
};
export const getMySections = async (req, res, next) => {
    const section = await sectionModel.find({ userId: req.userId }).populate([
      {
        path:'super',
        select:'name'
      },{
        path:'student',
        select:'name'
      },{
        path:'department',
        select:'name'
      }
    ]);
    return res.status(200).json(section);
};
export const assignTask = async (req, res, next) => {
    const { txt, sections,startDate,endDate } = req.body;
    const supervisorId = req.userId;
    if(req.file){
      const {secure_url} = await cloudinary.uploader.upload(req.file.path);
      const task = await taskModel.create({ txt, sections,startDate, endDate, file: secure_url,supervisor:supervisorId });
    }
    const task = await taskModel.create({ txt, sections,startDate, endDate,supervisor:supervisorId });
    return res.status(201).json({message:"success",task});
};
export const getTaskById = async (req, res, next) => {
    const {id} = req.params;
    const tasks = await taskModel.findById(id).populate([{
      path: 'section',
      select: 'num -_id'
  },{
    path: 'super',
    select: 'name'
  }]).select('supervisor txt sections startDate endDate file');
    return res.json({ message:"success",tasks });
};

