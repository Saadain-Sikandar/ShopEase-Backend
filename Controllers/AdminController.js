// get all order
import { Order } from "../Model/Orders.js";
import { User } from "../Model/User.js";

export const GetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "fullname email") // return only fullname and email
      .populate("products.productId")
      .sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(404).json({
        message: "Orders not Found!",
      });
    }
    return res.status(200).json({
      message: "All Orders fetched successfully!",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// update order status
export const UpdateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ["Pending", "In Process", "Completed", "Cancelled"];

    if (!validStatus) {
      return res.status(400).json({
        message: "Invalid Order Status!",
      });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({
        message: "Order not found!",
      });
    }
    // update status
    order.status = status;
    await order.save();

    return res.status(200).json({
      message: "Order Status Updated Successfully!",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// get all users
export const GetAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ CreatedAt: -1 });
    if (users.length === 0) {
      return res.status(404).json({
        message: "No User Found!",
      });
    }
    return res.status(200).json({
      message: "All User Fetched Successfully!",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// delete User

export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() === id) {
      return res.status(400).json({
        message: "You cannot Delete your Own(Admin) account! ",
      });
    }

    const deleteUser = await User.findByIdAndDelete(id);
    if(!deleteUser){
      return res.status(404).json({
        message:"User Not Found!",
      })
    }

    return res.status(200).json({
      message: "User Deleted Successfully!",
      deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
