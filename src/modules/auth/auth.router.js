import { Router} from "express";
import * as Auth from "./auth.controller.js";
const authRouter = Router();
authRouter.post('/',Auth.signUp);
export default authRouter;