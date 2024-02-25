const userSchema = require("../models/registration");
const HashPassword = require("../security/hashing");


const userSpecific = async (req,res)=>{ //user logged in?
 const userId = req.body.id;
 if(!userId) res.status(400).json({Alert:"No ID Sent!"});

  const results = await userSchema.findById(userId);
  if(!results || results.length===0){
    res.status(404).json({Alert:"No users found!"})
  }else{
    res.status(200).json(results);
  }
}


async function GetUsers(req, res, next) {
  try {
    const users = await userSchema.find().sort("createdAt");
    res.json(users).status(200);
  } catch (err) {
    console.error(err);
  }
  next((req, res) => {
    console.log(`Requested by ${req.url}`);
  });
}

async function CreateUser(req, res) {
  try {
    const { username, password, mail, photo } = req?.body;

    if (!username || !password || !mail)
      return res
        .status(400)
        .json({ Alert: "No Username/password/mail provided" });

    const findUser = await userSchema.findOne({
      $or: [{ username: username }, { mail: mail }],
    });

    if (!findUser) {
      const x = new HashPassword(password);
      const encrypted = x.hashPass();
      await userSchema.create({
        username,
        password: encrypted,
        mail,
        photo,
      });
      return res.status(201).json({ Alert: `${username} Saved` });
    } else {
      return res
        .status(400)
        .json({ Alert: `${username} or ${mail} already taken` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Alert: "Internal server error" });
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req?.params?.id;
    const convertedID = String(id);
    if (!id) return res.status(400).json({ Alert: "No ID Found" });

    const findId = await userSchema.deleteOne({ _id: convertedID });
    if (!findId) {
      return res.status(400).json({ Alert: "ID not found" });
    } else {
      return res.status(200).json({ Alert: `${id} Deleted` });
    }
  } catch (err) {
    console.error(err);
  }
};

const updatePassword = async (req, res) => {
  const { email, password } = req?.body;
  if (!email || !password)
    return res.status(400).json({ Alert: "No email/password found" });

  try {
    const findIfExists = await userSchema.findOne({ mail: email });

    if (!findIfExists) {
      return res.status(403).json({ Alert: "Email doesn't exist" });
    } else {
      // Update the password for the found user
      await userSchema.updateOne({
        $set: [{ mail: email }, { password: password }],
      });

      return res
        .status(200)
        .json({ Alert: `Updated ${email} password to ${password}` });
    }
  } catch (error) {
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
};


const followed = async (req,res)=>{
  const userId = req.body.id;
  if(!userId) res.status(400).json({Alert:"No ID Sent!"});
 
   const results = await userSchema.findById(userId);
   if(!results || results.length===0){
     res.status(404).json({Alert:"No users found!"})
   }else{
    await results.updateOne({following:{$inc:1}})
     res.status(200).json(`Following updated!`);
   }
}

const unfollowed = async (req,res)=>{
  const userId = req.body.id;
  if(!userId) res.status(400).json({Alert:"No ID Sent!"});
 
   const results = await userSchema.findById(userId);
   if(!results || results.length===0){
     res.status(404).json({Alert:"No users found!"})
   }else{
    await results.updateOne({following:{$inc:-1}})
     res.status(200).json(`Following updated!`);
   }
}










module.exports = { CreateUser, GetUsers, deleteUser, updatePassword,userSpecific,followed,unfollowed };
