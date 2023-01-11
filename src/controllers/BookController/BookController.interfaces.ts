import { IBookModelCreation } from "core/Book/BookEntity";

interface IBookController {
    get(id: number): Promise<any>;
    create(data: IBookModelCreation): Promise<any>;
    updateBook(pkBook: number, state: string): Promise<any>;
}
export type { IBookController }