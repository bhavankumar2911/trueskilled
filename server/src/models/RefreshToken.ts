import { model, Schema } from "mongoose";
import IRefreshTokenModel from "../interfaces/IRefreshTokenModel";

const schema = new Schema<IRefreshTokenModel>({
  id: String,
  token: String,
});

const RefreshToken = model("RefreshToken", schema);

export default RefreshToken;
