import express from 'express';
import { AddtoWish, DeletefromWish, getWishlist } from '../Controllers/WishListController.js';
import AuthMiddleWare from '../MiddleWare/AuthMiddleWare.js';

const router = express.Router()

router.post("/",AuthMiddleWare,AddtoWish)
router.get("/",AuthMiddleWare,getWishlist)
router.delete("/:productId",AuthMiddleWare,DeletefromWish)



export default router