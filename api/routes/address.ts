import express from "express";
import addressController from "../controllers/address";
const router = express.Router();

router.get("/topaddress", addressController.getFirstAddress);
router.get("/addresses", addressController.getAddresses);
router.get("/:address/txids", addressController.getTxids);
router.get("/:address", addressController.getAddress);
router.get("/:address/txs", addressController.getAddressTxs);
router.get("/flagged/:address", addressController.getAddressFlagged);
router.post("/flaggedaddrs", addressController.postAddressesFlagged);

export = router;
