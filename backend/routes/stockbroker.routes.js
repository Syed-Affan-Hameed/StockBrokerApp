import express from "express";
import { getStockbrokerInfo } from "../controllers/stockbroker.controller.js";
const router = express.Router();

router.post("/getStockbrokerInfo",getStockbrokerInfo);

export default router;