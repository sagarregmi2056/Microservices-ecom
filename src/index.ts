import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const NODE_ENVIRONMENT = process.env.NODE_ENV;
if (NODE_ENVIRONMENT === "developement")
  // yadi node environment developement
  dotenv.config({ path: ".envdev", override: true });
else dotenv.config({ path: ".envprod", override: true });

const port = process.env.PORT || 4000;

import bodyParser from "body-parser";
import { error } from "console";

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// handing global error

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    console.log(err);
  }

  next();
});

process.on(
  "uncaughtException",
  (reason: Error, req: Request, res: Response) => {
    console.log("uncaughtException");
    console.log(reason);
    process.exit(0);
  }
);

process.on(
  "unhandledRejection",
  (reason: Error, req: Request, res: Response) => {
    console.log("unhandledRejection");
    console.log(reason);
    process.exit(0);

    throw reason;
  }
);

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
