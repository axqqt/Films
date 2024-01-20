const adminModel = require("../models/admin");

const admins = async (req, res) => {
  try {
    const admins = await adminModel.find().sort("createdAt");
    res.status(200).json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const createAdmin = async (req, res) => {
  const { username, password, mail } = req?.body;

  if (!username || !password || !mail) {
    return res.status(400).json({ Alert: "username/password/mail required" });
  }

  const validity = await adminModel.findOne({
    $or: [{ username: username }, { password: password }],
  });

  if (!validity) {
    await adminModel.create({ username, password, mail });
    res.status(201).json({ Alert: `${username} Created` });
  } else {
    res.status(409).json({ Alert: `${username} or ${mail} already taken` });
  }
};

module.exports = { admins, createAdmin };
