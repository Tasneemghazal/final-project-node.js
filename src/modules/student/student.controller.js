import requestModel from "../../../DB/models/request.model.js";
import sectionModel from "../../../DB/models/section.model.js";
import { getStudent } from "../../utils/getId.js";

export const bookSection = async (req, res, next) => {
    const { students, sectionId } = req.body;
    const studentPromises = students.map(getStudent);
    const studentResults = await Promise.all(studentPromises);


    const notFoundStudents = students.filter((_, index) => !studentResults[index]);
    if (notFoundStudents.length > 0) {
      return res.status(400).json({ message: `Students with university numbers ${notFoundStudents.join(', ')} not found` });
    }

    const studentObjectIds = studentResults.map(student => student._id);
    const sectionPromises = studentObjectIds.map(studentId =>
      sectionModel.findOne({
        students: { $in: [studentId] },
        _id: { $ne: sectionId }
      })
    );
    const sectionResults = await Promise.all(sectionPromises);

    const alreadyInSectionIndex = sectionResults.findIndex(result => result);
    if (alreadyInSectionIndex !== -1) {
      return res.status(400).json({ message: `Student with university number ${students[alreadyInSectionIndex]} is already in another section` });
    }

    const existingRequest = await requestModel.findOne({
      students: { $in: studentObjectIds },
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingRequest) {
      return res.status(400).json({ message: "One or more students have already sent a request or are already in a pending or accepted status" });
    }

    const request = await requestModel.create({ students: studentObjectIds, studentId: req.userId, sectionId });
    await sectionModel.findByIdAndUpdate(sectionId, { visible: false });

    return res.status(201).json({ message: "Success", request });
};
