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

module.exports.getSingleProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-photo"
    );
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).send({
      success: true,
      message: "Single User fetched",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single profile",
    });
  }
};

module.exports.getProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.params.pid).select("photo");
    if (user.photo && user.photo.data) {
      res.set("Content-Type", user.photo.contentType);
      return res.status(200).send(user.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting profile photo",
    });
  }
};

module.exports.getRecentUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ updatedAt: -1 }).limit(5);
    res.status(200).json({
      success: true,
      message: "Profiles fetched successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
    });
  }
};

module.exports.searchProfiles = async (req, res) => {
  try {
    //extract page number, default 1
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 9;
    const skip = (page - 1) * limit;
    const query = req.query.q;
    if (!query) {
      res.status(400).json({ success: false, message: "No query passed" });
    }

    const users = await User.find({
      $or: [
        { name: new RegExp(query, "i") },
        { email: new RegExp(query, "i") },
      ],
    })
      .select("name email gender bio username")
      .sort({ createdAt: -1 }.skip(skip).limit(limit));

    const totalUsers = await User.countDocuments({});
    const hasMore = totalUsers > page * limit;

    res.status(200).json({
      success: true,
      message: "Profiles fetched successfully",
      users,
      hasMore,
    });
  } catch (error) {
    console.log("Error getting profiles", error);
    res.status(500).send({
      success: false,
      message: "Error in getting profiles",
    });
  }
};
