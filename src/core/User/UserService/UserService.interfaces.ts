import { IUserModelCreation } from "../UserEntity";

interface IUserService {
    get(id: number): Promise<any>;
    create(data: IUserModelCreation): Promise<any>;
}

export type { IUserService };