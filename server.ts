import * as dotenv from "dotenv";
dotenv.config();
import logger from "./utils/logger";
import { checkEnvVariables } from "./checkEnvVariables";

const envPath = process.env.NODE_ENV === "production" ? ".production" : ".development";
dotenv.config({ path: __dirname + `/config/${envPath}` });

checkEnvVariables();

import app from "./app";

const PORT = process.env.PORT || 5000;

logger.info(`Running in ${process.env.NODE_ENV} Mode`);

app.listen(PORT, () => logger.info(`Server Running on PORT : ${PORT}`));
