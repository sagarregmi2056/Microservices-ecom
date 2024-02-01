import express from "express";
import { merchantController } from "../../controller/merchents/Merchents.Controller";

export const merchantRouter = express.Router();

merchantRouter.post(
  "/create",
  // (req: express.Request, res: express.Response, next: express.NextFunction) =>
  //   modifyRequestMiddleware.requestModify(req, res, next),
  // merchantValidation.create(),
  (req: express.Request, res: express.Response) => {
    merchantController.create(req, res);
  }
);

// merchantRouter.post("/login", (req: express.Request, res: express.Response) => {
//   merchantController.login(req, res);
// });

// merchantRouter.post(
//   "/otp-verify",
//   (req: express.Request, res: express.Response) => {
//     merchantController.OTPVerify(req, res);
//   }
// );

// merchantRouter.get(
//   "/list",
//   merchantAuth,
//   (req: express.Request, res: express.Response) => {
//     merchantController.merchantList(req, res);
//   }
// );
