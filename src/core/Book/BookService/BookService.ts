import { ApplicationError } from "types/ApplicationError";
import { HTTPStatuses } from "types/HttpStatuses";
import { IBookModelCreation } from "../BookEntity";
import { BookRepository } from "../BookRepository";
import { IBookService } from "./BookService.interfaces";

class BookService implements IBookService {
    private readonly _bookRepository: BookRepository = new BookRepository();

    public async get(id: number): Promise<any> {
        const book = await this._bookRepository.findByPk(id);
        if(!book){
            throw new ApplicationError("Invalid id", HTTPStatuses.BAD_REQUEST);
        }
        return book;
    }
    public async create(data: IBookModelCreation){
        return await this._bookRepository.create(data);
    }

    public async updateBook(pkBook: number, state: string): Promise<any> {
        return await this._bookRepository.updateBook(pkBook, state);
    }
}

export { BookService }