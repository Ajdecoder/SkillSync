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

const corsOptions = {
    origin: 'https://app-skillsync.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
};

app.use(cors(corsOptions));

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
