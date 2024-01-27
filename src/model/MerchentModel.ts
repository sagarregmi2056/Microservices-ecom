import { model, Schema, Document, Model } from "mongoose";

interface IMerchant extends Document {
  name: string;
  email: string;
  mobileNo: number;
  mobileNoVerify?: boolean;
  emailVerify?: boolean;
  adminVerify?: boolean;
  createdAt: number;
  updatedAt: number;
}

const merchantSchema = new Schema<IMerchant>(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    mobileNo: { type: Number, unique: true, required: true, trim: true },
    mobileNoVerify: { type: Boolean, default: false },
    emailVerify: { type: Boolean, default: false },
    adminVerify: { type: Boolean, default: false },
    createdAt: Number,
    updatedAt: Number,
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
    },
    collection: "merchant",
  }
);

export const MerchantModel: Model<IMerchant> = model<IMerchant>(
  "merchant",
  merchantSchema
);
