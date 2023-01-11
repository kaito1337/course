import { IBookModel, IBookModelCreation } from "../BookEntity";

interface IBookRepository {
    findByPk(id: number): Promise<IBookModel>;
    create(data: IBookModelCreation): Promise<IBookModel>;
    findByTitle(title: string): Promise<IBookModel>;
}

export type { IBookRepository };