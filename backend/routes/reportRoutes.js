import express from "express";
import { exportTaskReport, exportUsersReport } from "../controllers/reportController.js";
import {adminOnly,protect} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get("/export/tasks",protect,adminOnly,exportTaskReport);
router.get("/export/users",protect,adminOnly,exportUsersReport);


export default router;