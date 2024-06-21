import { Router } from "express";
import * as MessageValidator from "../validators/message.validator";
import * as MessageController from "../controllers/message.controller";
import { asyncHandler } from "../middlewares/handlers.middleware";

const router = Router();


router.post( "/", MessageValidator.postMessage, asyncHandler( MessageController.postMessage ) );

export default router;

