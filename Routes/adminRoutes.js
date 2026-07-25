import express from "express";
import { GetAllOrders } from "../Controllers/AdminController.js";
import AdminMiddleWare from "../MiddleWare/AdminMiddleWare.js";
import AuthMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.get("/",AuthMiddleWare, AdminMiddleWare, GetAllOrders);

export default router;
