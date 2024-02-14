const mediaModel = require("../models/media");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();


async function GetFilms(req, res) {
  
  try {
    if (req.session.user) {
      const videos = await mediaModel.find({ _id: req.session.user._id }).populate("addedBy"); //if user logged in,get user specific data!
      res.status(200).json(videos);
    } else {
      const searchTerm = req?.params?.searchTerm;
  
      if (!searchTerm) {
        const videos = await mediaModel.find();
        res.status(200).json(videos);
      } else {
        const found = await mediaModel.find({ title: searchTerm });
  
        if (found.length === 0) {
          return res.status(404).json({ Alert: "Film not found!" });
        } else {
          return res.status(200).json(found);
        }
      }
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



// async function uploadToCloudinary(photo) {
//   try {
//     const result = await cloudinary.uploader.upload(
//       photo.buffer.toString("base64")
//     );
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error uploading to Cloudinary");
//   }
// }

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
