interface IBookModel { 
    id: number;
    title: string;
    author: string;
    state: string;
}

interface IBookModelCreation extends Omit<IBookModel, 'id'> {}

export type { IBookModel, IBookModelCreation }