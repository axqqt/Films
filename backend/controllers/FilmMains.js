const mediaModel = require("../models/media");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();


function shuffleArray(array) { //to randomize with each refresh the film shown in the page , like yt algorithm lol
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


async function GetFilms(req, res) {
  
  try {
    if (req.session.user) {
      const videos = await mediaModel.find({ _id: req.session.user._id }).populate("addedBy"); //if user logged in,get user specific data!
      res.status(200).json(videos);
    } else {
        const videos = await mediaModel.find();
        const shuffledVideos = shuffleArray(videos); //so this will randomize the video sent and will display in random order
        res.status(200).json(shuffledVideos);
      } 
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}





cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
  secure: true,
});



async function CreateFilms(req, res) {
  try {
    const { title, description, trailer, alternate, rating } = req.body;
    const { file: image } = req; // Access file object correctly

    if (!title || !trailer || !description ) {
      return res.status(400).json({ error: "Title, trailer, description missing" });
    }

    const photo = await cloudinary.uploader.upload(image.path); // Upload file to Cloudinary

    const filmExists = await mediaModel.findOne({ title });

    if (!filmExists) {
      await mediaModel.create({
        title,
        description,
        trailer,
        photo: photo.secure_url,
        alternate,
        rating,
      });

      return res.status(201).json({ success: `${title} saved` });
    } else {
      return res.status(409).json({ error: `${title} already exists` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const key = process.env.image_key;

async function ScanImage(req, res) {
  const { photo } = req?.body;

  try {
    const scanned = await Axios.post(
      "http://api-gpu.youscan.io/api/v2/images/detect",
      {
        headers: {
          " Authorization": `Basic ${key}`,
          " Content-Type": `application/json`,
        },
      },
      photo
    );
    return res.status(scanned.status).json(scanned);
  } catch (err) {
    console.error(err);
    return res.status(err.status).json(err.message);
  }
}

module.exports = { GetFilms, CreateFilms, ScanImage };
