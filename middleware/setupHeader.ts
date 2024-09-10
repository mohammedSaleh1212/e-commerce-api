
 
import { Request,Response,NextFunction } from 'express'

 function setupHeader (req:Request,res:Response,next:NextFunction) {
    res.header('Access-Control-Expose-Headers', 'x-auth-token')
    next()
}
export default setupHeader