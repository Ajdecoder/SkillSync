import express from "express";
import { getRequirement, postRequirement, testRequirement } from "../controller/user.controller.js";

const router = express.Router();

const app = express();

router.post('/getRequirement', getRequirement);
router.post('/postRequirement', postRequirement);
router.get('/testRequirement', testRequirement);


export default router;