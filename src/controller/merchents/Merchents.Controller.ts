import * as fs from "fs";
import * as path from "path";

const envPath = path.resolve(__dirname, "../../../.env");
const envFile = fs.readFileSync(envPath, "utf8");
const envVariables = envFile.split("\n");

envVariables.forEach((envVar) => {
  const [key, value] = envVar.split("=");
  process.env[key] = value;
});

import { Request, Response } from "express";

import { merchantServices } from "../../service/merchents/MerchentService";

class MerchantController {
  constructor() {}

  async create(req: Request, res: Response) {
    let request_id = req.body.request_id;

    try {
      let record = await merchantServices.save(req.body);
      return successRes(res, record, HttpStatusCode.OK);
    } catch (err) {
      return errorRes(res, err, HttpStatusCode.BAD_REQUEST);
    }
  }
}

export const merchantController = new MerchantController();
