import { NextFunction, Request, Response } from "express";
import { setAccessTokenCookie, setRefreshTokenCookie } from "../services/cookie.service";
import { signAccessToken, signRefreshToken } from "../services/jwt.service";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { UnauthorizedException } from "../utils/httpResponses";

const authenticationGuard = async (req: Request, res: Response, next: NextFunction) => {
  logger.debug("Inside Guard");
  const { accessToken, refreshToken } = req.cookies;
  try {
    jwt.verify(accessToken, process.env.JWT_KEY || "");
    logger.debug("Access Token is Valid.");
    next();
  } catch (e) {
    try {
      logger.debug("Access Token is not Valid. Checking Refresh Token");
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY || "");
      logger.debug("Refresh Token is Valid. Assigning new Access and Refresh Tokens");
      const newAccessToken = await signAccessToken(req.sessionID);
      const newRefreshToken = await signRefreshToken(req.sessionID);
      setAccessTokenCookie(res, newAccessToken);
      setRefreshTokenCookie(res, newRefreshToken);
      next();
    } catch (e) {
      logger.debug("Both Tokens Failed Validation");
      return new UnauthorizedException(res);
    }
  }
};

export { authenticationGuard };
