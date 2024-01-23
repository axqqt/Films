const Axios = require("axios");
require("dotenv").config();
const openapiKey = process.env.openapiKey;

const generateImages = async (req, res) => {
  const { image, quantity = 1, resolution = "1024x1024" } = req?.body; //by default 1024

  if (!image)
    return res
      .status(400)
      .json({ Alert: "Image/Quantity/Resolution Missing!" });

  try {
    const prompt = await Axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        headers: {
          "Content-Type": "application / json",
          Authorization: `Bearer ${openapiKey}`, //this key doesn't really work 😂
        },
      },
      {
        model: "dall-e-3",
        prompt: image,
        n: quantity,
        size: resolution,
      }
    );
    if (prompt.length) {
      return res.status(200).json(prompt);
    } else {
      return res.status(400).json({ Alert: "Couldn't process Image!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { generateImages };
