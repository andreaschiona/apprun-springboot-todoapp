export interface IShop {
  id: number;
  name: string;
  description: string;
}

export interface IShops {
  _embedded: IEmbeddedShops;
}

export interface IEmbeddedShops {
  shops: [IShop]
}