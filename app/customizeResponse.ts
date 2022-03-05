/* eslint-disable */
import { Request, Response, NextFunction } from "express";

const customizeResponse = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;
  // @ts-ignore
  res.send = function () {
    arguments[0] = modifyData(arguments[0], res);
    // @ts-ignore
    originalSend.apply(res, arguments);
  };
  next();
};

const modifyData = (originalData: any, res: Response) => {
  try {
    const data = {
      // @ts-ignore
      code: res.req.client._httpMessage.statusCode,
      method: res.req.method,
      path: res.req.baseUrl,
      data: JSON.parse(originalData),
    };
    const firstDigitOfStatusCode = JSON.stringify(data.code)[0];
    if (firstDigitOfStatusCode === "4" || firstDigitOfStatusCode === "5") return originalData;
    return JSON.stringify(data);
  } catch (error) {
    throw Error("ae");
  }
};

export default customizeResponse;
