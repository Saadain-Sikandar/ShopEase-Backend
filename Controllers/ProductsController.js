import { Product } from "../Model/Product.js";

// add
export const AddProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category } = req.body;

    if (!title || !description || !price || !stock || !category) {
      return res.status(400).json({
        message: "Please Fill all Reqired Fields!s",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image!",
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      stock,
      category,
      images: [req.file.path],
    });
    return res.status(201).json({
      message: "Product added Successfully!",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
// get
export const GetProducts = async (req, res) => {
  try {
    const products = await Product.find(); // give all products!
    res.status(200).json({
      message: "Products fetched Successfully!",
      totalProduct: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// single product get
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found!",
      });
    }
    return res.status(200).json({
      message: "Product Found!",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// update product
export const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
    };
    if (req.file) {
      updateData.images = [req.file.path];
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true, //return updated doc
      runValidators: true, // valide the fields
    });

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product Not Found!",
      });
    }
    return res.status(200).json({
      message: "Product Updated Successfully!!",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// delete
export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        messsge: "Product Not Found!",
      });
    }
    return res.status(200).json({
      message: "Product Deleted Succesfully!",
      deletedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
