import express from "express";
import {
    AddProduct,
    DeleteProduct,
    GetProducts,
    getSingleProduct,
    UpdateProduct,
} from "../Controllers/ProductsController.js";
import AdminMiddleWare from "../MiddleWare/AdminMiddleWare.js";
import AuthMiddleWare from "../MiddleWare/AuthMiddleWare.js";
import upload from "../MiddleWare/upload.js";

const router = express.Router();

// admin
router.post(
  "/",
  AuthMiddleWare,
  AdminMiddleWare,
  upload.single("image"),
  AddProduct,
);
router.put("/:id", AuthMiddleWare, AdminMiddleWare, UpdateProduct);
router.delete("/:id", AuthMiddleWare, AdminMiddleWare, DeleteProduct);
// user
router.get("/", GetProducts);
router.get("/:id", getSingleProduct);

export default router;
