import { model, Schema, Types } from "mongoose";
const sectionSchema = new Schema(
  {
    num: {
      type: String,
      required: true,
    },
    depId: {
      type: Types.ObjectId,
      ref: "department",
    },
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
    students:{
        type:[{type: Types.ObjectId,ref:"student"}],
        required:false,
    },
    visible:{
      type: Boolean,
      default:true
    },
    
  },
  { timestamps: true }
);

sectionSchema.virtual('super', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',

});
sectionSchema.virtual('student', {
  ref: 'student',
  localField: 'students',
  foreignField: '_id',

});
sectionSchema.virtual('department', {
  ref: 'department',
  localField: 'depId',
  foreignField: '_id',

});
sectionSchema.set('toObject', { virtuals: true });
sectionSchema.set('toJSON', { virtuals: true });
const sectionModel = model("section", sectionSchema);
export default sectionModel;