import express from 'express';
import traceTransactionsController from '../controllers/utxos';

const router = express.Router();


router.get('/:id', traceTransactionsController.getTracedTxs);


export = router;
