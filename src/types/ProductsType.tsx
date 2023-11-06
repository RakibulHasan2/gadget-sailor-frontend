export interface IProduct {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    _id: string;
    category_name: string;
    sub_category_name: string;
    brand_name:string;
    product_name: string;
    image: string[];
    model: string;
    description: string;
    price: number;
    product_code: number
    status:string;
    reviews: string[];
    warranty: string;
  }
  