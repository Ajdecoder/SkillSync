import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.Routes.js";
import companyRoutes from "./routes/user.Routes.js";
import { connectLoggedInRegDB, connectCompanyDB } from "./db/database.js";
import verifyUser from "./middleware/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9002;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

connectCompanyDB();
connectLoggedInRegDB();

app.use("/api/users", userRoutes);

app.use("/requirements", verifyUser, companyRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
