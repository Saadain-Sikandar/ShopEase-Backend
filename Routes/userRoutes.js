import express from "express";
import {
    profileController,
    UpdateProfile,
} from "../Controllers/UserController.js";
import AuthMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.get("/profile", AuthMiddleWare, profileController);
router.put("/profile", AuthMiddleWare, UpdateProfile);

export default router;
