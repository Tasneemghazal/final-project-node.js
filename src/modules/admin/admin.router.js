import {Router} from 'express';
import * as admin from './admin.controller.js';
const adminRouter =Router();

adminRouter.post('/addDep',admin.addDepartment);

export default adminRouter;