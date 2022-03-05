import * as dotenv from "dotenv";
import app from "./app";
import logger from "./utils/logger";

dotenv.config();

const envPath = process.env.NODE_ENV === "development" ? ".development" : ".production";

dotenv.config({ path: __dirname + `/config/${envPath}` });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`Server Running on PORT : ${PORT}`));
