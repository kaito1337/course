import express, { Request, Response, RequestHandler } from "express";
import { ApplicationError } from "types/ApplicationError";
import { HTTPStatuses } from "types/HttpStatuses";
import { DataApplicationError } from "types/DataApplicationError";
import { RequestFn } from "types/FunctionType";

abstract class BaseRouter<IController> {
  protected _controller: IController;
  protected _router = express.Router();

  constructor(controller: IController) {
    this._controller = controller;
  }

  private failable(f: RequestFn) {
    return async function (req: Request, res: Response) {
      try {
        console.log(await f(req, res));
      } catch (err) {
        console.log(err);
        if (
          err instanceof ApplicationError ||
          err instanceof DataApplicationError
        ) {
          return res.status(err.status).json({
            error: err.message,
            data: (err as DataApplicationError).data ?? {},
          });
        } else if (JSON.stringify(err) === "{}") {
          return res
            .status((err as ApplicationError).status ?? HTTPStatuses.INTERNAL)
            .json({
              error: (err as ApplicationError).message,
              data: (err as DataApplicationError).data ?? {},
            });
        } else {
          return res
            .status(HTTPStatuses.INTERNAL)
            .json({ error: (err as Error).message, data: {} });
        }
      }
    };
  }

  protected RegisterGetRoute(
    path: string,
    handler: RequestFn,
    ...middleware: RequestHandler[]
  ) {
    if (middleware) {
      this._router.get(
        path,
        middleware.map((x) => x),
        this.failable(handler)
      );
    }

    this._router.get(path, this.failable(handler));
  }

  protected RegisterPostRoute(
    path: string,
    handler: RequestFn,
    ...middleware: RequestHandler[]
  ) {
    if (middleware) {
      this._router.post(
        path,
        middleware.map((x) => x),
        this.failable(handler)
      );
    }

    this._router.post(path, this.failable(handler));
  }

  protected RegisterPutRoute(
    path: string,
    handler: RequestFn,
    ...middleware: RequestHandler[]
  ) {
    if (middleware) {
      this._router.put(
        path,
        middleware.map((x) => x),
        this.failable(handler)
      );
    }

    this._router.put(path, this.failable(handler));
  }

  protected RegisterDeleteRoute(
    path: string,
    handler: RequestFn,
    ...middleware: RequestHandler[]
  ) {
    if (middleware) {
      this._router.delete(
        path,
        middleware.map((x) => x),
        this.failable(handler)
      );
    }

    this._router.delete(path, this.failable(handler));
  }
}

export { BaseRouter };
