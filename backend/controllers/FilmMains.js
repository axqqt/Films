const mediaModel = require("../models/media");
const cloudinary = require("cloudinary").v2;



async function GetFilms(req, res) {
  
  // try {
  //   if (!req.session.user) {
  //     return res.status(401).json({ Alert: "Unauthorized" });
  //   }

  //   const userSpecific = await mediaModel.aggregate([
  //     {
  //       $lookup: {
  //         from: 'users',
  //         localField: 'title',
  //         foreignField: '_id',
  //         as: 'films',
  //       },
  //     },
  //   ]);

  //   if (!userSpecific || userSpecific.length === 0) {
  //     return res.status(404).json({ Alert: "No films found for the user" });
  //   } else {
  //     return res.status(200).json(userSpecific);
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ error: "Internal Server Error" });
  // }

  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
    const { title, description, trailer, alternate, rating } = req?.body;
 
    const image = req?.file;

    if (!title || !trailer || !description) {
      return res.status(400).json({ error: "Title/trailer/Description missing" });
    }


   
    // const photo = await cloudinary.uploader.upload(image);
    
    const filmExists = await mediaModel.findOne({ title: title });

    if (!filmExists) {
      await mediaModel.create({
        title,
        description,
        trailer,
        // photo: photo.url, 
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

async function ScanImage(req, res) {
  const { photo } = req?.body;

  try {
    const scanned = await Axios.post(
      "http://api-gpu.youscan.io/api/v2/images/detect",
      {
        headers: {
          " Authorization": `Basic ABCDEF`,
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
