const { User } = require("../model/userModel");
const { sendMail, sendNotification } = require("./mailController");

module.exports.sendDm = async (req, res) => {
  try {
    const username = req.params.username;
    const dm = req.body.dm;

    await User.updateOne(
      { username: username },
      {
        $push: {
          dms: dm,
        },
      },
    );

    let email = username + "@gmail.com";
    sendNotification(
      email,
      "Pairly: Someone sent you a message from your profile",
      `
            <body>
                <p>
                    Someone on Pairly has sent you a message after viewing your profile. Want to see what it is? Go to <a href="https://pairly.vercel.app">https://pairly.vercel.app</a> and check out!
                </p>
                <br/>ms isPrivate crushlist
                <p>From team Pairly<p/>
            </body>
        `,
    );

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to send message, try again",
    });
  }
};

const checkIfInCrushList = async (pid, userId) => {
  try {
    const user = await User.findById(pid);
    if (!user) {
      return false;
    }

    const isInCrushList = user.crushlist.includes(userId);
    return isInCrushList;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports.addToCrushList = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({
      username,
    });

    const pid = user._id;
    const currentUser = await User.findOne({
      email: req.email,
    });

    if (currentUser.crushlist.length >= 3) {
      res.status(400).send({
        success: false,
        message: "CrushList can only have upto 3 profiles",
      });
    }

    await User.updateOne(
      {
        email: req.email,
      },
      { $push: { crushlist: pid } },
    );

    await User.updateOne(
      {
        _id: pid,
      },
      { $inc: { crushcount: 1 } },
    );

    sendNotification(
      user.email,
      "Pairly: Someone added you as their crush",
      `
            <body>
                <p>
                    Someone on Pairly has made you thier crush. Check out here <a href="https://pairly.vercel.app">https://pairly.vercel.app</a>
                </p>
                <br/>
                <p>From team Pairly<p/>
            </body>
        `,
    );

    const isInCrushList = await checkIfInCrushList(pid, req._id);
    if (isInCrushList) {
      sendMail(pid, req._id);
    }

    res.status(200).send({
      success: true,
      message: `Added ${username} to crushlist`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding to crushlist",
    });
  }
};

module.exports.removeFromCrush = async (req, res) => {
  try {
    const pid = req.params.id;

    const updatedUser = await User.findOneAndUpdate(
      { email: req.email },
      { $pull: { crushlist: pid } },
      { new: true },
    );

    await User.updateOne(
      { _id: pid },
      {
        $inc: { crushcount: -1 },
      },
    );

    if (updatedUser) {
      res.status(200).send({
        success: true,
        message: `Successfully removed element with pid ${pid} from crushlist`,
      });
    } else {
      res.status(400).send({
        success: false,
        message: `User or element with pid ${pid} not found`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error removing element from crushlist, try later",
    });
  }
};

module.exports.deleteDms = async (req, res) => {
  try {
    const pid = req.params.pid;
    await User.updateOne(
      { _id: pid },
      {
        dms: [],
      },
    );

    res.status(201).send({
      success: true,
      message: "Dms deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Delete unsuccessfull, try later",
    });
  }
};

module.exports.getCrushDetails = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select(
      "name username gender",
    );
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single profile",
    });
  }
};

module.exports.getDms = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select(
      "dms isPrivate crushlist",
    );
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting dms",
    });
  }
};

module.exports.updatePrivate = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { isPrivate } = req.body;

    await User.findByIdAndUpdate(userId, { isPrivate }, { new: true });
    res.status(200).json({
      success: true,
      message: "isPrivate updated successfully",
    });
  } catch (error) {
    console.log("Error updating isPrivate", error);
    res.status(500).send({
      success: false,
      message: "Failed to update isPrivate",
    });
  }
};
