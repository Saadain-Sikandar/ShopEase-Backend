import express from "express";
import {
    GetMyorders,
    GetOrderById,
    PlaceOrder,
} from "../Controllers/OrderController.js";
import AuthMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.post("/", AuthMiddleWare, PlaceOrder);
router.get("/", AuthMiddleWare, GetMyorders);
router.get("/:id", AuthMiddleWare, GetOrderById);

export default router;
