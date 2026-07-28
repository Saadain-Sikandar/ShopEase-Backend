import express from "express";
import {
    profileController,
    UpdateProfile,
} from "../Controllers/UserController.js";
import AdminMiddleWare from "../MiddleWare/AdminMiddleWare.js";
import AuthMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.get("/profile", AuthMiddleWare, profileController);
router.put("/profile", AuthMiddleWare, AdminMiddleWare, UpdateProfile);

export default router;
