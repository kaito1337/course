import bcrypt from "bcrypt";
import { ApplicationError } from "types/ApplicationError";
import { DataApplicationError } from "types/DataApplicationError";
import { HTTPStatuses } from "types/HttpStatuses";
import { IUserModelAccess, IUserModelCreation } from "../UserEntity";
import { UserRepository } from "../UserRepository";
import { IUserService } from "./UserService.interfaces";

class UserService implements IUserService {
  private readonly _userRepository: UserRepository = new UserRepository();

  public async get(id: number): Promise<any> {
    const user = await this._userRepository.findByPk(id);
    if (!user) {
      throw new Error();
    }
    return user;
  }

  public async create(data: IUserModelCreation): Promise<any> {
    const regUser = await this._userRepository.findByLogin(data.login);
    if(regUser){
      throw new ApplicationError("Login already taken", HTTPStatuses.BAD_REQUEST);
    }
    await this._userRepository.create(data);
    return "Successfully created";
  }

  public async login(data: IUserModelAccess): Promise<any> {
    const user = await this._userRepository.findByLogin(data.login);
    if (!user || !await bcrypt.compare(data.password, user.password)) {
      throw new ApplicationError("Invalid credentials", HTTPStatuses.BAD_REQUEST);
    }
    return { username: user.name, login: user.login, takedBooks: user.takedBooks, listEditors: user.listEditors };
  }
}

export { UserService };
