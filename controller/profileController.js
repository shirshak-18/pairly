const fs = require("fs");
const { User } = require("../model/userModel");

module.exports.updateProfile = async (req, res) => {
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

module.exports.getProfiles = async (req, res) => {
  try {
    //pagination
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 9;
    const skip = (page - 1) * limit;
    const users = await User.find({})
      .select("name email gender bio username hasphoto")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    const hasMore = totalUsers > page * limit;

    res.status(200).json({
      success: true,
      message: "profiles fetched successfully!",
      users,
      hasMore,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in getting profiles",
    });
  }
};
