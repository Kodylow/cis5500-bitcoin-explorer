import express from "express";
import transactionHeadersController from "../controllers/transactionheaders";

const router = express.Router();

router.get("/", transactionHeadersController.getTxs);
router.get("/:id", transactionHeadersController.getTxDetailsByTxID);
router.get("/:id/merkle-proof", transactionHeadersController.getMerkleProof);

export = router;
