import { Request, Response } from "express";
import { UserController, IUserController } from "controllers/UserController";
import { HTTPStatuses } from "types/HttpStatuses";
import { BaseRouter } from "types/Router";

class UserRouter extends BaseRouter<IUserController> {
  constructor() {
    super(new UserController());
    this.execute();
  }

  private execute() {
    this.RegisterPostRoute("/user/get", this.getUser.bind(this));
    this.RegisterPostRoute("/user/create", this.createUser.bind(this));
    this.RegisterGetRoute("/user/test", this.test.bind(this));
    this.RegisterPostRoute("/user/login", this.login.bind(this));
  }

  private async getUser(req: Request, res: Response): Promise<Response> {
    const response = await this._controller.get(req.body.id);
    return res.status(HTTPStatuses.SUCCESS).json({ response });
  }

  private async createUser(req: Request, res: Response): Promise<Response> {
    const response = await this._controller.create(req.body);
    return res.status(HTTPStatuses.CREATED).json({ response });
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const response = await this._controller.login(req.body);
    return res.status(HTTPStatuses.SUCCESS).json({ response });
  }

  private async test(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ response: "All Ok!" });
  }
}

export default UserRouter;
