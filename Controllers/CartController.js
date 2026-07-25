import { Product } from "../Model/Product.js";
import { User } from "../Model/User.js";

// add
export const AddToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "product Not Found!",
      });
    }
    // checks item already exists
    const existingProduct = user.cart.find(
      (item) => item.productId.toString() === productId,
    );
    const totalQuantity = existingProduct
      ? existingProduct.quantity + quantity
      : quantity;
    // checks quantity not exceeds
    if (totalQuantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} item(s) available in stock!`,
      });
    }
    if (existingProduct) {
      existingProduct.quantity = totalQuantity;
    } else {
      user.cart.push({ productId, quantity });
    }
    await user.save();
    return res.status(200).json({
      message: "Product added to cart successfully!",
      cart: user.cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get
export const GetCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.productId");
    return res.status(200).json({
      message: "Cart fetched Successfully!",
      cart: user.cart,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// update
export const UpdateCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be atleast 1!",
      });
    }
    // finding item in cart
    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId,
    );
    if (!cartItem) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }
    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} item(s) available in stock!`,
      });
    }
    cartItem.quantity = quantity;

    await user.save();
    return res.status(200).json({
      message: "Cart updated successfully!",
      cart: user.cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// delete 
export const DeleteCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId,
    );
    if (!cartItem) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId,
    );
    await user.save();
    return res.status(200).json({
      message: "Product removed from cart!",
      cart: user.cart,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
