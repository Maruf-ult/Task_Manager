import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware";
import { exportTaskReport, exportUsersReport } from "../controllers/reportController";


const router = express.Router();

router.get("/export/tasks",protect,adminOnly,exportTaskReport);
router.get("/export/users",protect,adminOnly,exportUsersReport);


export default router;