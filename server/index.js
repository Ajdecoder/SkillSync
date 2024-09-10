import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.Routes.js";
import companyRoutes from "./routes/company.Routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || 9002;

const corsOptions = {
    origin: process.env.CORS_ORIGIN, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use("/api/requirements", companyRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
