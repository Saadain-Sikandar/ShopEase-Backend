export const profileController = async (req, res) => {
  try {
    res.status(200).json({
      message: "User fetched Succesfully!",
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
