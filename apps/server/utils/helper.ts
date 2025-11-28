// packages/utils/sendResponse.ts
import type { Response } from "express";

export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
  errors: any = null
) => {
  const response: any = { statusCode, message };
  if (data) response.data = data;
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};
