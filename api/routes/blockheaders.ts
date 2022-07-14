import express from "express";
import controller from "../controllers/blockheaders";
const router = express.Router();

router.get('/blockheaders/:id', controller.getBlock);
// router.get("/blockheaders", controller.getBlockHeader);
// router.get("/blockheaders/:id", controller.getBlockHeader);
// router.put("/blockheaders/:id", controller.updateBlockHeader);
// router.delete("/blockheaders/:id", controller.deleteBlockHeader);
// router.post("/blockheaders", controller.addBlockHeader);

export = router;
