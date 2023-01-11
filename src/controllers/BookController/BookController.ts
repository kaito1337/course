import { IBookModelCreation } from "core/Book/BookEntity";
import { BookService } from "core/Book/BookService";
import { IBookController } from "./BookController.interfaces";

class BookController implements IBookController {
    private _bookService: BookService = new BookService()

    public async get(id: number) {
        return await this._bookService.get(id);
    }

    public async create(data: IBookModelCreation) {
        return await this._bookService.create(data);
    }

    public async updateBook(pkBook: number, state: string) {
        return await this._bookService.updateBook(pkBook, state);
    }
}

export { BookController }