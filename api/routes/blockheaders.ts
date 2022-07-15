import express from "express";
import controller from "../controllers/blockheaders";
const router = express.Router();

router.get("/blockheaders", controller.getBlocks);
router.get("/blockheaders/height", controller.getMaxBlockHeight);
router.get('/blockheaders/:id', controller.getBlock);
router.get('/blockheaders/:id/txs', controller.getBlockTxs);

// router.delete("/blockheaders/:id", controller.deleteBlockHeader);
// router.post("/blockheaders", controller.addBlockHeader);

export = router;
