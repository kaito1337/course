import { IUserModelAccess, IUserModelCreation } from "core/User/UserEntity";
import { UserService } from "core/User/UserService";
import { validatePassword } from "libs/regex/regex";
import { IUserController } from "./UserController.interfaces";

class UserController implements IUserController {
  private readonly _userService: UserService = new UserService();

  public async get(id: number): Promise<any> {
    if (!id) {
      throw new Error("Write id");
    }

    return await this._userService.get(id);
  }

  public async create(data: IUserModelCreation): Promise<any> {
    if (!data.login || !data.name || !data.password) {
      throw new Error("Please, fill the all fields");
    }else if(!validatePassword(data.password)){
      throw new Error("Password must be at least 6 symbols and must have 1 special character, and 1 capital letter"); 
    }

    return await this._userService.create(data);
  }

  public async login(data: IUserModelAccess): Promise<any> {
    if (!data.login || !data.password) {
      throw new Error("Wrong credentials");
    }

    return await this._userService.login(data);
  }
}

export { UserController };
