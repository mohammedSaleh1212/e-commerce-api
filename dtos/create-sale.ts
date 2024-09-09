interface SaleUser {
    // name:string
    // email:string
    id:string


}
interface SaleProduct {
    // title:string
    id:string

}
export interface CreateSale {
    // user:SaleUser
    // product:SaleProduct
    userId:string
    productId:string

}