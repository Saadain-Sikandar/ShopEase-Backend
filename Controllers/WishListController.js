import { Product } from "../Model/Product.js";
import { User } from "../Model/User.js";

// add to wish
export const AddtoWish = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found!",
      });
    }
    // check existing
    const exist = user.wishlist.find((item) => item.toString() === productId);
    if (exist) {
      return res.status(400).json({
        message: "Product already in Cart!",
      });
    }
    // add product
    user.wishlist.push(productId);
    await user.save();
    return res.status(200).json({
      message: "Product added to wishlist!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// get wish
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    return res.status(200).json({
      message: "wishlist Fetched Successfully!",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// delete
export const DeletefromWish = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    const wishItem = user.wishlist.find(
      (item) => item.toString() === productId,
    );
    if (!wishItem) {
      return res.status(404).json({
        message: "product not found!",
      });
    }
    // removing from wishlist
    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== productId,
    );
    await user.save();
    return res.status(200).json({
      message: "product removed from wishlist!",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
