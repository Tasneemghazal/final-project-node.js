import { model, Schema} from "mongoose";
const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
departmentSchema.index({ name: 1 }, { unique: true });


const departmentModel = model("department", departmentSchema);
export default departmentModel;