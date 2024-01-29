const Axios = require("axios");
require("dotenv").config();
const openapiKey = process.env.open_api_key;

const generateImages = async (req, res) => {
  const { image, quantity = 1, resolution = "1024x1024" } = req?.body;

  if (!image)
    return res
      .status(400)
      .json({ Alert: "Image/Quantity/Resolution Missing!" });

  try {
    const response = await Axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-3",
        prompt: image,
        n: quantity,
        size: resolution,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openapiKey}`,
        },
      }
    );

    if (response.data) {
      return res.status(200).json(response.data);
    } else {
      return res.status(400).json({ Alert: "Couldn't process Image!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { generateImages };
