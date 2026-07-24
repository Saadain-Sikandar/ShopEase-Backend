import express from "express";
import { profileController } from "../Controllers/UserController.js";
import AuthMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.get("/profile", AuthMiddleWare, profileController);

export default router;
