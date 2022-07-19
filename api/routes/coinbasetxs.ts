import express from "express";
import coinbaseTxsController from "../controllers/coinbasetxs";
const router = express.Router();

router.get('/', coinbaseTxsController.getCoinbaseTxs);
router.get('/:id', coinbaseTxsController.getCoinbaseTx);

export = router;
