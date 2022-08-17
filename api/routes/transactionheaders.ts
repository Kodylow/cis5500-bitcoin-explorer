import express from "express";
import transactionHeadersController from "../controllers/transactionheaders";

const router = express.Router();

router.get("/", transactionHeadersController.getTxs);
router.get("/:id", transactionHeadersController.getTxDetailsByTxID);
router.get("/:id/merkle-proof", transactionHeadersController.getMerkleProof);
router.get("/vouts/:id", transactionHeadersController.getVoutAddresses);
router.get("/flagged/:id", transactionHeadersController.getTXFlagged);
router.post("/newflagged", transactionHeadersController.postFlaggedTXs);
router.post("/flaggedtxs", transactionHeadersController.checkFlaggedTXs);

export = router;
