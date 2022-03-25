import { Router } from "express";
import { createKeyController,validateHelloController,encryptMessageController } from "./controllers/encryptController"

const router = Router();

const CreateKeyController = new createKeyController();
const ValidateHelloController = new validateHelloController();
const EncryptMessageController = new encryptMessageController();

router.post('/newkey',CreateKeyController.handle)
router.post('/validate', ValidateHelloController.handle)
router.post('/encrypt', EncryptMessageController.handle)


export { router }