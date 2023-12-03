export type IPayment = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: string | number | boolean | any[] | IPayment;
};


export type IPayments = {
    email: string
    payment_code: number
    firstName:string
    lastName:string
    phoneNumber:number
    district:string
    comments?:string
    paymentMethod:string
    deliveryMethod:string
    transactionId:string
    address:string
    other?:string
}
