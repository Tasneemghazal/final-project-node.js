import {Router} from 'express';
import * as admin from './admin.controller.js';
import uploadFile, { fileTypes } from '../../utils/multer.js';
import { checkEmail} from '../../middleware/checkEmail.middleware.js';
import { checkDep } from '../../middleware/checkDep.middleware.js';
import { auth } from '../../middleware/auth.middleware.js';
import { role } from '../../utils/role.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { checkStudentEmail } from '../../middleware/checkStudentEmail.middleware.js';
import { checkStudentNum } from '../../middleware/checkStudentNum.middleware.js';
const adminRouter =Router();

adminRouter.post('/addDep',auth([role.admin]),asyncHandler(admin.addDepartment));
adminRouter.get('/getDep',auth([role.admin]),asyncHandler(admin.getDepartments));
adminRouter.delete('/deleteDep/:id',auth([role.admin]),asyncHandler(admin.deleteDepartment));
adminRouter.post('/addUser',auth([role.admin]),uploadFile(fileTypes.image).single("img"),checkEmail,checkDep,asyncHandler(admin.addUser));
adminRouter.get('/getUsers',auth([role.admin]),asyncHandler(admin.getUsers));
adminRouter.patch('/editUser',auth([role.admin]),asyncHandler(admin.updateUser));
adminRouter.delete('/deleteUser/:id',auth([role.admin]),asyncHandler(admin.deleteUser));
adminRouter.post('/addStudent',auth([role.admin]),uploadFile(fileTypes.image).single("img"),checkStudentEmail,checkStudentNum,checkDep,asyncHandler(admin.addStudent));
adminRouter.get('/getStudents',auth([role.admin]),asyncHandler(admin.getStudents));
adminRouter.delete('/deleteStudent/:id',auth([role.admin]),asyncHandler(admin.deleteStudent));
adminRouter.get('/getUser/:id',auth([role.admin]),asyncHandler(admin.getUser));
adminRouter.get('/getStudent/:id',auth([role.admin]),asyncHandler(admin.getStudent));


export default adminRouter;