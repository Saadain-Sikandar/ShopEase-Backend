import express from "express";
import {
    AdminGetOrderById,
    DeleteUser,
    GetAllOrders,
    GetAllUser,
    UpdateOrderStatus,
} from "../Controllers/AdminController.js";
import AdminMiddleWare from "../MiddleWare/AdminMiddleWare.js";
import AuthMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.get("/orders", AuthMiddleWare, AdminMiddleWare, GetAllOrders);
router.get("/orders/:id", AuthMiddleWare, AdminMiddleWare, AdminGetOrderById);
router.patch("/orders/:id", AuthMiddleWare, AdminMiddleWare, UpdateOrderStatus);
router.get("/users", AuthMiddleWare, AdminMiddleWare, GetAllUser);
router.delete("/users/:id", AuthMiddleWare, AdminMiddleWare, DeleteUser);

export default router;
