import {Router} from 'express';
import * as admin from './admin.controller.js';
import uploadFile, { fileTypes } from '../../utils/multer.js';
import { checkEmail } from '../../middleware/checkEmail.middleware.js';
import { checkDep } from '../../middleware/checkDep.middleware.js';
import { auth } from '../../middleware/auth.middleware.js';
import { role } from '../../utils/role.js';
const adminRouter =Router();

adminRouter.post('/addDep',admin.addDepartment);
adminRouter.post('/addUser',auth([role.admin]),uploadFile(fileTypes.image).single("img"),checkEmail,checkDep,admin.addUser);
adminRouter.get('/getUsers',auth([role.admin]),admin.getUsers);
export default adminRouter;