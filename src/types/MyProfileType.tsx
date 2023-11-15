
export type User = {
   firstName: string;
    lastName: string;
}

  export type IUpdateUsers = {
    name?:User
    email?: string;
    password?: string;
    phoneNumber?: number;
    image?: string;
    present_address?: string;
    permanent_address?: string;
    post_code?: string;
    city?: string;
    division?: string;
    confirmPassword?: string;
  };