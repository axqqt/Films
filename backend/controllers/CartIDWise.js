const UserOrder = require("../models/userOrder");
const itemModel = require("../models/items");
const mongoose = require("mongoose");

// const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport({ //haven't setup nodemailer yet, it's like an auto mailing system
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//     clientId: process.env.OAUTH_CLIENTID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN,
//   },
// });

async function PlaceOrder(req, res) {
  const id = req?.params?.id;
  const { item, quantity, mail } = req?.body;

  if (!id) {
    return res.status(400).json({ Alert: "No ID received" });
  }

  try {
    const itemExists = await itemModel.findOne({ itemName: item });

    if (!itemExists) {
      return res.status(400).json({ Alert: "Item not found" });
    }

    if (itemExists.itemQuantity < quantity || !itemExists.itemAvailability) {
      return res
        .status(400)
        .json({ Alert: "Item unavailable or not enough stock remaining!" });
    }

    await itemModel.updateOne(
      { itemName: item },
      { $inc: { itemQuantity: -quantity } }
    );

    await UserOrder.create({
      orderedItem: item,
      orderedQuantity: quantity,
    });

    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "veloxalfrfr",
        pass: "velobaka123",
      },
    });

    const mailOptions = {
      from: '"Team VeloFlix" <from@imveloxal@gmail.com>',
      to: mail,
      subject: "Order Placed",
      text: `Dear user, your order for ${quantity} ${item}(s) has been placed. Thank you!`,
    };

    await transport.sendMail(mailOptions);

    return res.status(201).json({ Alert: "Order Placed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
}

const deleteItem = async (req, res) => {
  const id = req.params.id;

  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    const result = await UserOrder.deleteOne({ _id: id });

    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { PlaceOrder, deleteItem };
