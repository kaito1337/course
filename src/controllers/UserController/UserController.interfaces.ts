import { IUserModelAccess, IUserModelCreation } from "core/User/UserEntity";

interface IUserController {
    get(id: number): Promise<any>;
    create(data: IUserModelCreation): Promise<any>;
    login(data: IUserModelAccess): Promise<any>;
    takeBook(login: string, pkBook: number): Promise<any>;
}

export type {
    IUserController
}