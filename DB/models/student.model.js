import { model, Schema, Types } from "mongoose";
const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    depId: {
      type: Types.ObjectId,
      ref: "department",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    sendCode: {
      type: String,
      default: null,
    },
    academicYear: {
        type:Number,
        required: true,
    },
    role:{
      type: String,
      default:"student"
    },
    universityNum:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
studentSchema.virtual('department', {
  ref: 'department',
  localField: 'depId',
  foreignField: '_id',

});

studentSchema.set('toObject', { virtuals: true });
studentSchema.set('toJSON', { virtuals: true });

const studentModel = model("student",studentSchema);
export default studentModel;