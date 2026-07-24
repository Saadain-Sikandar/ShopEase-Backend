import express from "express";
import { AddProduct, DeleteProduct, GetProducts, getSingleProduct, UpdateProduct } from "../Controllers/ProductsController.js";

const router = express.Router();

router.post("/", AddProduct);
router.get("/", GetProducts);
router.get("/:id",getSingleProduct);
router.put("/:id",UpdateProduct);
router.delete("/:id",DeleteProduct);





export default router;
