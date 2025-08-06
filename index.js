import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/dbConfig.js";
import userRoutes from "./Routes/userRoute.js";
import notesRoutes from "./Routes/notesRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the Notes Application Backend!");
});

app.use("/api/user",userRoutes);
app.use("/api/notes",notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
