import { Request, Response, NextFunction } from "express";

export function indexWelcome(req: Request, res: Response, next: NextFunction) {
  return res.json("Welcome my API");
}
