export interface IUser {
  identifier: string;
  password: string;
}

export interface IProduct {
  documentId: string;
  id: number;
  price: number;
  thumbnail: {
    url: string;
  };
  categories?: {
    title: string;
  }[];
  title: string;
  quantity: number;
  stock?: number;
  description:string
}

export interface ICat {
  title: string;
  id?: number;
  documentId?:string;
}

export interface IFile {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}
