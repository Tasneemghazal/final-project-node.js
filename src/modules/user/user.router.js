import { Router } from "express";
import * as Users from "./user.controller.js"
const userRouter = Router();
 userRouter.get('/',Users.getUser);

export default userRouter;