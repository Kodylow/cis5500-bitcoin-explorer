import express from "express";
import dashboardController from "../controllers/dashboard";
const router = express.Router();

router.get("/txsovertime", dashboardController.getTxsOverTime);
router.get("/btcminedovertime", dashboardController.getBTCMinedOverTime);
router.get("/diffcultybymonth", dashboardController.getDifficultyDataByMonth);

export = router;
