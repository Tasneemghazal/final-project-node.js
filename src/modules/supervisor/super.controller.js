import requestModel from "../../../DB/models/request.model.js";
import sectionModel from "../../../DB/models/section.model.js";

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
      const {students} = await requestModel.findById(req.body.requestId)
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
      return res.status(201).json({ message: "Success", request});
  };