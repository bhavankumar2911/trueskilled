import JWTPayload from "../../interfaces/JWTPayload";
import jwt from "jsonwebtoken";

export default (
  secret: string,
  payload: JWTPayload,
  expiresIn: number | string
) => jwt.sign(payload, secret, { expiresIn });
