import express from 'express';
import transactionHeadersController from '../controllers/transactionheaders';

const router = express.Router();


router.get('/', transactionHeadersController.getRecentTxs);

export = router;
