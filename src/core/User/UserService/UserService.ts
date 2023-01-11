import bcrypt from "bcrypt";
import { BookRepository } from "core/Book/BookRepository";
import { ApplicationError } from "types/ApplicationError";
import { HTTPStatuses } from "types/HttpStatuses";
import { IUserModelAccess, IUserModelCreation } from "../UserEntity";
import { UserRepository } from "../UserRepository";
import { IUserService } from "./UserService.interfaces";

class UserService implements IUserService {
  private readonly _userRepository: UserRepository = new UserRepository();
  private readonly _bookRepository: BookRepository = new BookRepository();

  public async get(id: number): Promise<any> {

    const user = await this._userRepository.findByPk(id);
    if (!user) {
      throw new ApplicationError("User not found", HTTPStatuses.BAD_REQUEST);
    }
    return user;
  }

  public async create(data: IUserModelCreation): Promise<any> {
    const regUser = await this._userRepository.findByLogin(data.login);
    if (regUser) {
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

  public async takeBook(login: string, pkBook: number): Promise<any> {
    const book = await this._bookRepository.findByPk(pkBook);
    const user = await this._userRepository.findByLogin(login);
    if (!user || !book || book.state != "On stock") {
      throw new ApplicationError("Book or user not found", HTTPStatuses.BAD_REQUEST);
    }
    let takedBooks = user.dataValues.takedBooks
    takedBooks.push(pkBook);
    book.setUser(user);
    await this._bookRepository.updateBook(pkBook, { state: "Taked" })
    return await this._userRepository.updateUser(login, { takedBooks });
  }
}

export { UserService };
