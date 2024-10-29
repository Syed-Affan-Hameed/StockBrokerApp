import express from "express";
import { getStockbrokerInfo,getImage } from "../controllers/stockbroker.controller.js";
const router = express.Router();

router.post("/getStockbrokerInfo",getStockbrokerInfo);

router.post("/getImage",getImage);

export default router;