import { Order } from "../Model/Orders.js";
import { User } from "../Model/User.js";

// add to orders
export const PlaceOrder = async (req, res) => {
  try {
    const { fullname, contact, city, address } = req.body;
    if (!fullname || !contact || !city || !address) {
      return res.status(400).json({
        message: "Please provide all shipping details!",
      });
    }
    const user = await User.findById(req.user._id).populate("cart.productId");

    if (user.cart.length === 0) {
      return res.status(400).json({
        message: "Cart is empty!",
      });
    }

    let subtotal = 0;
    let orderProducts = [];

    for (const item of user.cart) {
      const product = item.productId; //product is now whole product document since cart.productId is populated.
      if (item.quantity > product.stock) {
        return res.status(400).json({
          message: `${product.title} has only ${product.stock} item(s) left.`,
        });
      }
      subtotal += product.price * item.quantity;
      orderProducts.push({
        productId: product._id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        quantity: item.quantity,
      });
      product.stock -= item.quantity;
      await product.save();
    }
    const shipping = 0;
    const total = subtotal + shipping;

    const order = await Order.create({
      userId: user._id,
      products: orderProducts,
      shippingAddress: {
        fullname,
        contact,
        city,
        address,
      },
      subtotal,
      shipping,
      total,
    });
    user.cart = [];
    await user.save();
    return res.status(201).json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get my orders (user)
export const GetMyorders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("products.productId")
      .sort({ createdAt: -1 });
    if (orders.length == 0) {
      return res.status(404).json({
        message: "Orders not found!",
      });
    }
    return res.status(200).json({
      message: "Orders fetched successfully!",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// get order by id
export const GetOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({_id:id,userId:req.user._id}).populate("products.productId");
    if (!order) {
      return res.status(404).json({
        message: "Order Not Found!",
      });
    }
    return res.status(200).json({
      message: "Order fetched successfully!",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
