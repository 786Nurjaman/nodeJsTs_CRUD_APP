import express from "express";
const expressHealthCheck = require("express-healthcheck");
const router: express.Router = express.Router();

router.use("/up", expressHealthCheck({
    healthy: () => `Hello !! everything is ok... ${new Date().toISOString()}`
}));

import * as UserController from './modules/user/user.controller';
 import {redis_Data} from './modules/user/user.controller'
//User
router.post('/create',UserController.createUser)
router.get('/getAllUser',redis_Data,UserController.getAllUser)
router.get('/getSingleUser/:id',UserController.getSingleUser)
router.put('/updateUser/:id',UserController.updateUser)
router.delete('/deleteUser/:id',UserController.deleteUser)


export default router;
