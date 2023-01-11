import { Book, IBookModelCreation } from "../BookEntity";
import { IBookRepository } from "./BookRepository.interfaces";


class BookRepository implements IBookRepository {
    public async create(data: IBookModelCreation): Promise<any> {
        return await Book.create({
            title: data.title,
            author: data.author,
            state: "On stock"
        });
    }
    public async findByPk(id: number): Promise<any> {
        return await Book.findByPk(id);
    }
    public async findByTitle(title: string): Promise<any> {
        return await Book.findOne({
            where: { title }
        });
    }

    public async updateBook(pkBook: number, data: any): Promise<any> {
        return await Book.update({ state: data.state }, { where: { id: pkBook }});
    }
}
export { BookRepository }