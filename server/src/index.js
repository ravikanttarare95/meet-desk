import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n📞 Server is listening on PORT ${PORT}`);
  connectDB();
});
