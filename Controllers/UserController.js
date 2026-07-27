
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

// update profile
export const UpdateProfile = async (req, res) => {
  try {
    const { email, fullname, contact, city, address } = req.body;

    const user = req.user

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    // Update only provided fields
    if (email) user.email = email;
    if (fullname) user.fullname = fullname;
    if (contact) user.contact = contact;
    if (city) user.city = city;
    if (address) user.address = address;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully!",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
