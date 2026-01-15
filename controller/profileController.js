const fs = require("fs");
const { User } = require("../model/userModel");

module.exports.updatrProfile = async (req, res) => {
  try {
    const { name, gender } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({
          success: false,
          message: "Name is required",
        });
      case !gender:
        return res.status(500).send({
          success: false,
          message: "Gender is required",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          success: false,
          message: "Photo size should be less than 1mb",
        });
    }

    const user = await User.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields },
      { new: true }
    );

    if (photo) {
      user.photo["data"] = fs.readFileSync(photo.path);
      user.photo["contentType"] = photo.type;
    }
    await user.save();
    res.status(200).send({
      success: true,
      message: "Profile updated successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error updating the profile",
    });
  }
};
