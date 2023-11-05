export type UserName = {
    firstName: string,
    lastName: string
 }
 export type IUser = {
    name: UserName,
    email: string,
    phoneNumber: number,
    password: string
 }
 
 export interface Product {
   category_name: string;
   sub_category_name?: string; // Use null or an appropriate type if it's optional
   brand_name: string; // Use null or an appropriate type if it's optional
 }
 