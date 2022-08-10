import logger from "../utils/logger";

export const ENV_VARIABLES = ["NODE_ENV", "PORT", "SESSION_SECRET", "JWT_KEY", "JWT_REFRESH_KEY", "DATABASE_URL"];
export const NODE_ENV_OPTIONS = ["development", "production", "testing"];

const checkEnvVariables = () => {
  const missingVars: string[] = [];
  let hasNodeEnvCorrectValue: boolean | undefined;

  for (const item of ENV_VARIABLES) {
    if (!Object.keys(process.env).includes(item)) {
      missingVars.push(item);
    }
  }
  if (!process.env.NODE_ENV || !NODE_ENV_OPTIONS.includes(process.env.NODE_ENV)) {
    hasNodeEnvCorrectValue = false;
  } else {
    hasNodeEnvCorrectValue = true;
  }

  if (missingVars.length || !hasNodeEnvCorrectValue) {
    missingVars.forEach((item) => logger.error(`${item} env variable is missing`));
    !hasNodeEnvCorrectValue && logger.error(`NODE_ENV should have value from one of these : ${JSON.stringify(NODE_ENV_OPTIONS)}`);
    process.exit();
  }
};

export { checkEnvVariables };
