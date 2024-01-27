import dotenv from "dotenv";
dotenv.config();

const NODE_ENVIRONMENT = process.env.NODE_ENV;

switch (NODE_ENVIRONMENT) {
  case "development":
    // yadi node environment developement
    dotenv.config({ path: ".envdev", override: true });
    break;

  case "staging":
    dotenv.config({ path: ".envstaging", override: true });
    break;

  case "production":
    dotenv.config({ path: ".envprod", override: true });
    break;
}

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const { SERVER_PORT, HOST, LAMBDA } = process.env;

import bodyParser from "body-parser";
import { error } from "console";

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// if issue with any api related method or url
app.use("/", async (req: any, res, next) => {
  res.status(400).json({
    message:
      "issue with api Routes or method" + Date.now() + "" + NODE_ENVIRONMENT,
  });
});

// handing global error like body and sytanxerror

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    console.log(err);
  }

  next();
});

process.on(
  "uncaughtException",
  (reason: Error, req: Request, res: Response) => {
    const response = {
      status: false,
      message: "something went wrong try again later",
      error: reason,
    };

    console.info(reason);
    process.exit(0);
  }
);

process.on(
  "unhandledRejection",
  (reason: Error, req: Request, res: Response) => {
    const response = {
      status: false,
      message: "something went wrong try again later",
      error: reason,
    };

    console.error(reason);
    // process.exit(0);

    throw reason;
  }
);

app.use((req, res, next) => {
  const response = {
    status: false,
    message: "page not found on the server/api not available",
  };
});

if (LAMBDA == "false") {
  app.listen(SERVER_PORT, () => {
    console.log(
      `server started at port ${HOST} ${SERVER_PORT} of ${NODE_ENVIRONMENT}} mode`
    );
  });
} else {
  module.exports = app;
}
