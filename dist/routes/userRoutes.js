"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../middlewares/auth");
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.post('/', auth_1.jwtCheck, userController_1.default.createCurrentUser);
router.put('/', auth_1.jwtParse, validation_1.validateMyUserRequest, userController_1.default.updateCurrentUser);
router.get('/', auth_1.jwtParse, userController_1.default.getCurrentUser);
exports.default = router;
