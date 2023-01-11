import { IUserModelAccess, IUserModelCreation } from "../UserEntity";

interface IUserService {
    get(id: number): Promise<any>;
    create(data: IUserModelCreation): Promise<any>;
    login(data: IUserModelAccess): Promise<any>;
    takeBook(login: string, pkBook: number): Promise<any>;
}

export type { IUserService };