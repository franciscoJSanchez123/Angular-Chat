export interface User {
    name:string;
    password:string;
    email:string;
    ordersId?:string[]
    admin?:boolean

}