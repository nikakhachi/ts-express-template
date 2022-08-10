import * as dotenv from "dotenv";
dotenv.config();
import logger from "./utils/logger";
import { checkEnvVariables } from "./config/env";
import app from "./app";

checkEnvVariables();

const PORT = process.env.PORT || 5000;

logger.info(`Running in ${process.env.NODE_ENV} Mode`);

app.listen(PORT, () => logger.info(`Server Running on PORT : ${PORT}`));
