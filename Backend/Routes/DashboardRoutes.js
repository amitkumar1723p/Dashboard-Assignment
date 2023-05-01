import express from "express";
import {
  getAllData,
  createDashboardData,
} from "../Controller/DashboardController.js";

const router = express.Router();

//  Create Dashboard data
router.post("/createdata", createDashboardData);
router.get("/getalldata", getAllData);
export default router;
