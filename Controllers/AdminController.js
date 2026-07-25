// get all order
import { Order } from "../Model/Orders.js";

export const GetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId","fullname email") // return only fullname and email
      .populate("products.productId")
      .sort({ createdAt: -1 });
      if(orders.length === 0){
        return res.status(404).json({
            message:"Orders not Found!"
        })
      }
      return res.status(200).json({
        message:"All Orders fetched successfully!",
        orders,
      })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
