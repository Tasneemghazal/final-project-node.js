import chatModel from "../../../DB/models/chat.model.js";
import requestModel from "../../../DB/models/request.model.js";
import sectionModel from "../../../DB/models/section.model.js";
import submitModel from "../../../DB/models/submit.model.js";
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
  const studentsAlreadyInChat = await chatModel.find({ users: { $in:students } });
    
    if (studentsAlreadyInChat.length > 0) {
      return res.status(400).json({ message: "One or more students are already in a chat." });
    }
    await chatModel.create({
      users: students,
      groupAdmin: req.userId,
    });
  return res.status(201).json({ message: "Success", request });
};
export const getMySections = async (req, res, next) => {
  const section = await sectionModel.find({ userId: req.userId }).populate([
    {
      path: "depId",
      select: "name",
    },
    {
      path: "userId",
      select: "name",
    },
    {
      path: "students",
      select: "name",
    },
  ]);
  return res.status(200).json(section);
};
export const assignTask = async (req, res, next) => {
  const { txt, sections, startDate, endDate } = req.body;
  const supervisorId = req.userId;
  if (req.file) {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path);
    const task = await taskModel.create({
      txt,
      sections,
      startDate,
      endDate,
      file: secure_url,
      supervisor: supervisorId,
    });
  }
  const task = await taskModel.create({
    txt,
    sections,
    startDate,
    endDate,
    supervisor: supervisorId,
  });
  return res.status(201).json({ message: "success", task });
};
export const getTaskById = async (req, res, next) => {
  const { id } = req.params;
  const tasks = await taskModel
    .findById(id)
    .populate([
      {
        path: "sections",
        select: "num -_id",
      },
      {
        path: "supervisor",
        select: "name",
      },
    ])
    .select("supervisor txt sections startDate endDate file");
  return res.json({ message: "success", tasks });
};
export const getSupervisorSubmissions = async (req, res, next) => {
  const tasks = await taskModel.find({ supervisor: req.userId });
  const taskIds = tasks.map((task) => task._id);
  const submissions = await submitModel
    .find({ taskId: { $in: taskIds } })
    .populate([
      {
        path: "taskId",
      },
      { path: "section" },
    ]);
  return res.status(200).json({ message: "success", submissions });
};
export const giveFeedback = async (req, res, next) => {
    const {  feedback , taskId} = req.body;
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const feed = await taskModel.findByIdAndUpdate(
      taskId,
      { feedback },
      { new: true }
    ).populate({path:"supervisor",select:"name"});
    return res.status(200).json({ message: "success", feed});
};
export const getSupervisorTasks = async (req, res, next) => {
    const tasks = await taskModel.find({ supervisor: req.userId }).populate({path:"sections",select:"num"}).select("txt startDate endDate file");
    return res.status(200).json({ tasks });
};
export const updateTask = async (req, res, next) => {
  const {id}= req.params;
  const { txt, sections,startDate,endDate } = req.body;
  const supervisorId = req.userId;
  let task=null;
  if(req.file){
  const {secure_url} = await cloudinary.uploader.upload(req.file.path);
  task = await taskModel.findByIdAndUpdate(id,{ txt, sections,startDate, endDate, file: secure_url,supervisor:supervisorId },{new:true});
  }
  task = await taskModel.findByIdAndUpdate(id,{ txt, sections,startDate, endDate,supervisor:supervisorId },{new:true});
  return res.status(201).json({message:"success",task});
};
export const deleteTask = async (req, res, next) => {
    const {id}= req.params;
    const task = await taskModel.findOneAndDelete({_id:id});
    return res.status(201).json({message:"success",task});
};
export const getRequests = async (req, res, next) => {
    const sections = await sectionModel.find({ userId: req.userId });
    const sectionIds = sections.map(section => section._id);
    const requests = await requestModel.find({ sectionId: { $in: sectionIds},state:"Pending" }).populate([{
      path:"students",select:"name phoneNumber email",
    },{
      path:"sectionId",select:"num"
    },{
      path:"studentId",select:"name phoneNumber email"
    }]);      
    return res.status(200).json({ requests });
};
export const getRequestById = async (req, res, next) => {
    const {id} = req.params;
    const request = await requestModel.findById(id).populate([{
      path:"students",select:"name phoneNumber email",
    },{
      path:"sectionId",select:"num"
    },{
      path:"studentId",select:"name phoneNumber email"
    }]);      ;
    return res.json({ message:"success",request });
};
