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
    this.RegisterGetRoute("/user/get", this.getUser.bind(this));
    this.RegisterPostRoute("/user/create", this.createUser.bind(this));
    this.RegisterPostRoute("/user/login", this.login.bind(this));
    this.RegisterPutRoute("/user/takeBook", this.takeBook.bind(this));
  }

  private async getUser(req: Request, res: Response): Promise<Response> {
    const id:number = parseInt(req.query.id as string)
    const response = await this._controller.get(id);
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

  public async takeBook(req: Request, res: Response): Promise<Response> {
    const response = await this._controller.takeBook(req.body.login, req.body.pkBook);
    return res.status(HTTPStatuses.SUCCESS).json({ response: "Success taked" });
  }

}

export default UserRouter;
