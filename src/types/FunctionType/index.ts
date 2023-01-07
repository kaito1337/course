import { NextFunction, Request, Response } from 'express';

export type asyncFn = (...arg: any) => Promise<any>;
export type Fn = (...arg: any) => any;
export type RequestFn = (req: Request, res: Response, next?: NextFunction) => Promise<any>;