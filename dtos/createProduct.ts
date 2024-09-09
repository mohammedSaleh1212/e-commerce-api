
import { categorySchema } from "../models/category"
 interface createProductDto {
    title:string
    description:string
    category:typeof categorySchema
    numberInStock:number
}
export default createProductDto