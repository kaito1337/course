import { BookController, IBookController } from "controllers/BookController";
import { Request, Response } from "express";
import { HTTPStatuses } from "types/HttpStatuses";
import { BaseRouter } from "types/Router";

class BookRouter extends BaseRouter<IBookController> {
  constructor() {
    super(new BookController());
    this.execute();
  }

  private execute() {
    this.RegisterGetRoute("/book/get", this.getBook.bind(this));
    this.RegisterPostRoute("/book/create", this.createBook.bind(this));
  }

  private async getBook(req: Request, res: Response): Promise<Response> {
    const id:number = parseInt(req.query.id as string)
    const response = await this._controller.get(id);
    return res.status(HTTPStatuses.SUCCESS).json({ response });
  }

  private async createBook(req: Request, res: Response): Promise<Response> {
    const response = await this._controller.create(req.body);
    return res.status(HTTPStatuses.CREATED).json({ response });
  }
}

export default BookRouter;
