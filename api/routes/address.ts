import express from "express";
import addressController from "../controllers/address";
const router = express.Router();

router.get("/:address", addressController.getAddress);
router.get("/:address/txs", addressController.getAddressTxs);
router.get('/addresses', addressController.getAddresses)

export = router;
