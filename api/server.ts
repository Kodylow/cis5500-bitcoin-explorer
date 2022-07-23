import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/blockheaders";
import transactionHeaderRouter from "./routes/transactionheaders";
import addressRouter from "./routes/address";
import coinbaseTxsRouter from './routes/coinbasetxs';
import traceTxsRouter from './routes/tracetransactions';


const router: Express = express();

// morgan for logging
router.use(morgan("dev"));

// middlewares
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// cors
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

router.use("/", routes);
router.use("/transactions", transactionHeaderRouter);
router.use("/address", addressRouter);
router.use("/coinbasetxs", coinbaseTxsRouter);
router.use("/tracetxs", traceTxsRouter);


/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = 5010;
httpServer.listen(PORT, () =>
  console.log(`The api server is running on port ${PORT}`)
);
