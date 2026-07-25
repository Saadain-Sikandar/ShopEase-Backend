import express from 'express';
import { AddToCart, DeleteCart, GetCart, UpdateCart } from '../Controllers/CartController.js';
import AuthMiddleWare from '../MiddleWare/AuthMiddleWare.js';

const router = express.Router()

router.post('/',AuthMiddleWare,AddToCart)
router.get('/',AuthMiddleWare,GetCart)
router.put('/:productId',AuthMiddleWare,UpdateCart)
router.delete('/:productId',AuthMiddleWare,DeleteCart)




export default router