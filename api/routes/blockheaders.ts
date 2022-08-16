import express from "express";
import controller from "../controllers/blockheaders";
const router = express.Router();

router.get("/blockheaders", controller.getBlocks);
router.post("/blockheaders", controller.postBlockByHeights);
router.get("/blockheaders/height", controller.getMaxBlockHeight);
router.get("/blockheaders/:height", controller.getBlockByHeight);
router.get("/blockheaders/:id/txs", controller.getBlockTxs);
router.get("/blockheaders/:id/check", controller.checkBlockExists);

export = router;
