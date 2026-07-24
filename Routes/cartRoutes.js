import express from 'express';
import { AddToCart, GetCart } from '../Controllers/CartController.js';
import AuthMiddleWare from '../MiddleWare/AuthMiddleWare.js';

const router = express.Router()

router.post('/',AuthMiddleWare,AddToCart)
router.get('/',AuthMiddleWare,GetCart)


export default router