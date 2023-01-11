import { IBookModelCreation } from "../BookEntity";

interface IBookService { 
    get(id: number): Promise<any>;
    create(data: IBookModelCreation): Promise<any>;
    updateBook(pkBook: number, state: string): Promise<any>;
}

export type { IBookService}