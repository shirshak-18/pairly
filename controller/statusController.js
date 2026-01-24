const { Status, Reply } = require("../model/statusModel");

module.exports.postStatus = async (req, res) => {
  try {
    const status = new Status({
      username: req.username,
      content: req.body.content,
    });
    await status.save();
    return res.send({
      success: true,
      message: "Status posted",
      status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Posting status",
    });
  }
};

module.exports.getStatus = async (req, res) => {
  try {
    const status = await Status.find({});
    res.status(200).send({
      success: true,
      status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting status",
    });
  }
};

module.exports.postLike = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    const userId = req._id;
    const value = req.params.value;
    if (value == "1") {
      if (!status.likedBy.includes(userId)) {
        status.likes++;
        status.likedBy.push(userId);
        await status.save();
        res.send({
          message: "Like success",
        });
      } else {
        res.status(400).send({
          message: "User already liked this status",
        });
      }
    } else if (value == "0") {
      if (status.likedBy.includes(userId)) {
        status.likes--;
        status.likedBy = status.likedBy.filter(
          (id) => id.toString() !== userId,
        );
        await status.save();
        res.send({
          message: "status disliked",
        });
      }
    } else {
      res.status(400).send({
        message: "incorrect value",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error liking the post",
    });
  }
};

module.exports.postReply = async (req, res) => {
  try {
    const { reply } = req.body;
    const id = req.params.id;
    let newReply = new Reply({
      username: req.username,
      content: reply,
      root: id,
    });
    newReply.save();
    res.send({ success: true, reply: newReply });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in posting reply",
    });
  }
};

module.exports.getReplies = async (req, res) => {
  try {
    const id = req.params.id;
    const replies = await Reply.find({ root: { $in: id } }).select(
      "content likes createdAt likedBy",
    );
    const revReplies = [...replies].reverse();
    res.status(200).send({ success: true, replies: revReplies });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting replies",
    });
  }
};

module.exports.postLikeReply = async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    const userId = req._id;
    const value = req.params.value;

    if (value == "1") {
      if (!reply.likedBy.includes(userId)) {
        reply.likes++;
        reply.likedBy.push(userId);
        await reply.save();
        res.send({
          message: "Like success",
        });
      } else {
        res.status(400).send({
          message: "User already liked this reply",
        });
      }
    } else if (value == "0") {
      if (reply.likedBy.includes(userId)) {
        reply.likes--;
        reply.likedBy = reply.likedBy.filter((id) => id.toString() !== userId);
        await reply.save();
        res.send({
          message: "unlike success",
        });
      }
    } else {
      res.status(400).send({
        message: "User hasn't liked this reply",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in liking the reply",
    });
  }
};
