import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const port = 7000;
app.use(bodyParser.json());
app.use(cors());

const mongoDbUrl =
  process.env.MONGO_DB_URL ||
  "mongodb+srv://Ganesh:bGIDYCpPJeONuXKB@cluster0.d7yotjw.mongodb.net/foodorderapp";

if (!mongoDbUrl) {
  console.error("MONGO_DB_URL is not defined");
  process.exit(1);
}

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database is not connected");
  });

app.get('/health',async(req:Request,res:Response)=>{
  res.send("health is ok!")
})
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
