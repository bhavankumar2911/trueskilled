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

// token config
interface ITokenConfig {
  accessTokenSecret: undefined | string;
  refreshTokenSecret: undefined | string;
}

export let TokenConfig: ITokenConfig = {
  accessTokenSecret: "",
  refreshTokenSecret: "",
};

if (nodeEnv == "development") {
  config();
}

TokenConfig.accessTokenSecret = process.env.DEV_ACCESS_TOKEN_SECRET;
TokenConfig.refreshTokenSecret = process.env.DEV_REFRESH_TOKEN_SECRET;

export default {
  dbString,
  TokenConfig,
};
