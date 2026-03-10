export interface Products{
    id : number,
    title : string,
    description : string,
    category : string,
    brand : string,
    price : number,
    rating : number,
    tags : string[],
}

export interface ProductsResponse {
  limit: number;
  products: Products[];
  skip: number;
  total: number;
}


