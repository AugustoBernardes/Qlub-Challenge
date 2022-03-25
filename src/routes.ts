import { Router } from "express";
import { createKeyController,validateHelloController } from "./controllers/encryptController"

const router = Router();

const CreateKeyController = new createKeyController();
const ValidateHelloController = new validateHelloController();

router.post('/newkey',CreateKeyController.handle)
router.post('/validate', ValidateHelloController.handle)


export { router }