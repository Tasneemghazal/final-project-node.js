import sectionModel from "../../../DB/models/section.model.js";

export const createSection = async (req, res, next) => {
      const { num, userId } = req.body;
      const section = await sectionModel.findOne({ num, depId: req.depId });
      if (section) {
        return res.json({ message: "Section already exists in this department" });
      }
      const newSection = await sectionModel.create({ num, depId: req.depId, userId });
      return res.status(201).json({ message: "Success", newSection });
};
export const getHeadSections = async (req, res, next) => {
    const sections = await sectionModel.find({ depId: req.depId });
    if (sections.length===0) {
      return res.status(404).json({ message: "There are no sections available for your department." });
    }
    return res.status(200).json(sections);
};
export const deleteSection = async (req, res, next) => {
    const { id } = req.params;
    const section = await sectionModel.findOneAndDelete({_id:id},{ depId: req.depId});
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    return res.status(200).json(section);
};
