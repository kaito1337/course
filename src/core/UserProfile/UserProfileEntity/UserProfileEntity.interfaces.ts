interface IUserProfileModel {
    id: number;
    name: string;
    login: string;
    surname: string;
    city: string;
    country: string;
  }
  
  interface IUserProfileModelCreation extends Omit<IUserProfileModel, "id"> {}
  
  
  export type { IUserProfileModel, IUserProfileModelCreation };
  