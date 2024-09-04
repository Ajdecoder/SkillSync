import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.Routes.js";
import companyRoutes from "./routes/company.Routes.js";
import { connectLoggedInRegDB, connectCompanyDB } from "./db/database.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || 9002;

app.use(
  cors((req, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://app-skillsync.vercel.app"
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      callback(null, { origin: true, credentials: true });
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

connectCompanyDB();
connectLoggedInRegDB();

app.use("/api/users", userRoutes);

app.use("/api/requirements", companyRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
