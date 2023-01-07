import { NextFunction, Request, Response } from "express";
import { Dialect } from "sequelize";

type IORM = {
  name: string;
  port: string;
  host: string;
  dialect: Dialect;
  user: string;
  password: string;
};

type IBcrypt = {
  rounds: number
}

type HttpMiddlewares = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

interface IConfig {
  orm: IORM;
  bcrypt: IBcrypt;
  port: string;
  routers: string[];
  middlewares?: HttpMiddlewares[];
}

export type {
  IConfig,
  HttpMiddlewares,
}
