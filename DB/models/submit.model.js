import { model, Schema, Types } from "mongoose";
const submitSchema = new Schema(
  {
    txt: {
      type: String,
    },
    file: {
      type: String,
    },
    section: {
      type: Types.ObjectId,
      ref:"section",
     
    },
    taskId: {
        type: Types.ObjectId,
        ref: "task",
      },
  },
  { timestamps: true }
);
// submitSchema.virtual('task', {
//   ref: 'task',
//   localField: 'taskId',
//   foreignField: '_id',

// });
submitSchema.virtual('sec', {
  ref: 'section',
  localField: 'section',
  foreignField: '_id',

});

submitSchema.set('toObject', { virtuals: true });
submitSchema.set('toJSON', { virtuals: true });

const submitModel = model("submit",submitSchema);
export default submitModel;