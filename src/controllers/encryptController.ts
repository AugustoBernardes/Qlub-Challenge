import { Request,Response } from "express"
import { createKeyService, validateHelloService} from "../services/encryptService"

class createKeyController{
    async handle(request: Request, response: Response){
        const createKey = new createKeyService();
        try {
            const key = request.body

            const result = await createKey.execute(key);

            return response.json(result)
            
        } catch (error) {
            response.status(400).json({
                message:error.message
            })
        }
    }
}

class validateHelloController{
    async handle(request: Request, response: Response){
        const ValidateHelloService = new validateHelloService();

        try {
            const {key, hash} = request.body

            const result = await ValidateHelloService.execute(key, hash);

            return response.json(result)
            
        } catch (error) {
            response.status(400).json({
                message:error.message
            })
        }


    }
}


export { createKeyController, validateHelloController}