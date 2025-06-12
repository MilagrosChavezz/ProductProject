export interface ProductCart {
    id: number;
    name: string;
    price: number;
    quantity: number;
    ProductOrder?: {
    quantity: number;
  };
}

export interface OrderCart {
    id: number;
    userId: number;
    products:ProductCart[];
    totalPrice: number;
}
