"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 7000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const mongoDbUrl = process.env.MONGO_DB_URL ||
    "mongodb+srv://Ganesh:bGIDYCpPJeONuXKB@cluster0.d7yotjw.mongodb.net/foodorderapp";
if (!mongoDbUrl) {
    console.error("MONGO_DB_URL is not defined");
    process.exit(1);
}
mongoose_1.default
    .connect(mongoDbUrl)
    .then(() => {
    console.log("Database connected");
})
    .catch((err) => {
    console.log(err);
    console.log("Database is not connected");
});
app.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("health is ok!");
}));
app.use("/api/user", userRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
