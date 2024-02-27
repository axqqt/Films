const Axios = require("axios");
require("dotenv").config();
const openapiKey = process.env.open_api_key;

const generateImages = async (req, res) => {
  const { image, quantity = 1, resolution = "1024x1024" } = req?.body;

  if (!image)
    return res
      .status(400)
      .json({ Alert: "Image Missing!" });

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

const diffusionKey = process.env.diffusion;

const stableDiffusion = async(req,res)=>{
  const {Default,Negative} = req.body;
  if(!Default) return res.status(400).json({Alert:"The default prompt is a MUST!"})
  try{
    const request = await Axios.post("https://stablediffusionapi.com/api/v4/dreambooth",{headers: 'Content-Type: application/json'},{ "key": `${diffusionKey}`,
    "model_id": "crystal-clear-xlv1",
    "prompt": Default,
    "negative_prompt": Negative,
    "width": "512",
    "height": "512",
    "samples": "1",
    "num_inference_steps": "30",
    "seed": null,
    "guidance_scale": 7.5,
    "webhook": null,
    "track_id": null});

    if(request && request.length){
      res.status(200).json(request);
    }else{
      res.status(404).json({Alert:"No data received!"})
    }
  }catch(err){
    console.error(err);
  }
}

module.exports = { generateImages,stableDiffusion };
