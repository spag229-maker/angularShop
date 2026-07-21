export type CartItemType = {
  product: {
    id: string;
    name: string;
    url: string;
    image: string;
    price: number;
  };
  quantity: number;
};

export type CartType = {
  items: CartItemType[];
};
