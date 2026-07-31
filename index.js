import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ConnectDB from "./DataBase/db.js";
import adminRoutes from "./Routes/adminRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import productsRoutes from "./Routes/productsRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import wishListRoutes from "./Routes/wishListRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
ConnectDB();

// routes
// auth
app.use("/api/auth", authRoutes);
// user
app.use("/api/user", userRoutes);
// products
app.use("/api/products", productsRoutes);
// cart
app.use("/api/cart", cartRoutes);
// wihslist
app.use("/api/wishlist", wishListRoutes);
// orders
app.use("/api/orders", orderRoutes);
// Admin
app.use("/api/admin", adminRoutes);

// images
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Only listen locally — Vercel handles this itself in production
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
  });
}

export default app;
