import express from "express";
import transactionHeadersController from "../controllers/transactionheaders";

const router = express.Router();

router.get("/", transactionHeadersController.getTxs);
router.get("/:id", transactionHeadersController.getTxDetailsByTxID);

export = router;
