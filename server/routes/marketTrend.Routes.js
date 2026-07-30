import express from "express";
import { getMarketTrends } from "../controller/marketTrend.controller.js";

const router = express.Router();

router.get("/", getMarketTrends);

export default router;
