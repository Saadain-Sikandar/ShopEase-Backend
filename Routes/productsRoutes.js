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
  upload.array("images", 5),
  AddProduct,
);
// user
router.get("/", GetProducts);
router.get("/:id", getSingleProduct);
// admin
router.put("/:id", AuthMiddleWare, AdminMiddleWare, UpdateProduct);
router.delete("/:id", AuthMiddleWare, AdminMiddleWare, DeleteProduct);

export default router;
