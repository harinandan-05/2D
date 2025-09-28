import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(400).json({ msg: "no headars" });
  }

  try {
    const splited = authHeader.split("")[1];
    if (!splited) {
      return res.status(400).json({ msg: "no token in header" });
    }
    const token = jwt.verify(splited, process.env.JWT_SECRET as string);
    req.user = token;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "internal server error at token management" });
  }
}
