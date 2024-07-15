import  express  from "express";
import userController from '../controllers/userController'
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validation";
const router=express.Router()

router.post('/',jwtCheck,userController.createCurrentUser)
router.put('/',jwtParse,validateMyUserRequest,userController.updateCurrentUser)
router.get('/',jwtParse,userController.getCurrentUser)
export default router;