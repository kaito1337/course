import { IUserModel, IUserModelCreation } from "../UserEntity";

interface IUserRepository {
    findByPk(id: number): Promise<IUserModel>;
    create(data: IUserModelCreation): Promise<IUserModel>;
    findByLogin(login: string): Promise<IUserModel>;
}

export type { IUserRepository };