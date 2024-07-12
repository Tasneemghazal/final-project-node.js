import connectDB from "../DB/connection.js";
import adminRouter from "./modules/admin/admin.router.js";
import authRouter from "./modules/auth/auth.router.js";
import headRouter from "./modules/headOfDepartment/head.router.js";
import stdRouter from "./modules/student/student.router.js";

const initApp = (app, express) => {
  connectDB();
  app.use(express.json());

  app.get('/', (req, res) => {
    return res.status(200).json({ message: "success" });
  });

  app.use('/auth', authRouter);
  app.use('/admin', adminRouter);
  app.use('/head', headRouter);
  app.use('/student', stdRouter);
  app.use('*', (req, res) => {
    return res.status(404).json({ message: "page not found" });
  });

  app.use((err, req, res, next) => {
    return res.status(err.statusCode).json({ message: err.message });
  });
};

export default initApp;
