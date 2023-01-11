interface IUserModel {
  id: number;
  name: string;
  login: string;
  password: string;
  takedBooks: Array<number>;
  listEditors: Array<number>;
}

interface IUserModelCreation extends Omit<IUserModel, "id"> {}
interface IUserModelAccess extends Omit<IUserModel, "id" | "name" | "takedBooks" | "listEditors">  {}


export type { IUserModel, IUserModelCreation, IUserModelAccess };
