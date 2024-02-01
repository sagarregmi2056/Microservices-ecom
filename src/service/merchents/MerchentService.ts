import { MerchantModel } from "../../model/MerchentModel";

class MerchantService {
  DEFAULT_FIELDS: string =
    "name email mobileNo mobileNoVerify emailVerify adminVerify";
  // save function to save data on db
  async save(data: any) {
    const doc = new MerchantModel(data);
    try {
      let record = await doc.save();
      return record;
    } catch (e) {
      if (e && e.code === 11000) {
        const duplicateField = Object.keys(e.keyValue)[0];
        const errorMessage = `${duplicateField} already exists.`;
        return errorMessage;
      }
      return (e as Error).message;
    }
  }

  // async findRow(conditions: any = [], fields: string = "") {
  //   if (countObject(conditions) == 0) return false;

  //   if (fields == "") fields = this.DEFAULT_FIELDS;
  //   try {
  //     const record = await MerchantModel.findOne(conditions)
  //       .select(fields)
  //       .lean();
  //     return record;
  //   } catch (e) {
  //     return false;
  //   }
  // }
  // async findAll(conditions: any = [], fields: string = "") {
  //   if (fields == "") fields = this.DEFAULT_FIELDS;
  //   try {
  //     const record = await MerchantModel.find()
  //       .select(fields || this.DEFAULT_FIELDS)
  //       .lean();
  //     return record;
  //   } catch (e) {
  //     return false;
  //   }
  // }
}

export const merchantServices = new MerchantService();
