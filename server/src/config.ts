import { config } from "dotenv";

const nodeEnv = process.env.NODE_ENV;

let dbString: string = "";

if (nodeEnv == "development") {
  config();

  dbString = process.env.DEV_DB_CONNECTION_STRING as string;
}

if (nodeEnv == "production") {
  dbString = process.env.PROD_DB_CONNECTION_STRING as string;
}

export default {
  dbString,
};
