const mediaModel = require("../models/media");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

async function GetFilms(req, res) {
  const id = req?.params?.id; //thinking of possibly connecting two routes to the same function!
  if (!id) {
    try {
      const videos = await mediaModel.find(); //if no such id is given then do this!
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    const found = await mediaModel.findOne({ _id: String(id) }); //if id is given!
    if (!found) {
      return res.status(400).json({ Alert: "Invalid ID" });
    } else {
      return res.status(200).json(found);
    }
  }
}

cloudinary.config({
  cloud_name: "dsto9mmt0",
  api_key: "857482966483428",
  api_secret: "Vry5wv5flNncSsA3t6km4SQcGnM",
  secure: true,
});

async function CreateFilms(req, res) {
  try {
    const { title, description, trailer, alternate, rating, photo } = req?.body;

    // Check if required fields are missing
    if (!title || !trailer) {
      return res.status(400).json({ error: "Title or trailer missing" });
    }

    // const video = await cloudinary.uploader.upload(
    //   req.file.buffer.toString("base64"),
    //   {
    //     resource_type: "video",
    //   }
    // );

    // let photoURL;
    // try {
    //   photoURL = await uploadToCloudinary(photo);
    // } catch (uploadError) {
    //   console.error(uploadError);
    //   return res
    //     .status(500)
    //     .json({ error: "Error uploading photo to Cloudinary" });
    // }

    const filmExists = await mediaModel.findOne({ title: title });

    if (!filmExists) {
      await mediaModel.create({
        title,
        description,
        trailer,
        // photo: photoURL.url,
        // video: video.secure_url,
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

async function uploadToCloudinary(photo) {
  try {
    const result = await cloudinary.uploader.upload(
      photo.buffer.toString("base64")
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading to Cloudinary");
  }
}

module.exports = { GetFilms, CreateFilms };
