const { OAuth2Client } = require("google-auth-library");
const userModel = require("../models/userModel");

const client = new OAuth2Client(process.env.CLIENT_ID);

exports.getCurrentUser = async (req, res) => {
  // const data = req.user;
  console.log(process.env.CLIENT_ID);
  // console.log("user", req.isAuthenticated(), req.session);
  // res.status(200).json(data);
};

exports.googleLogin = async (req, res) => {
  const tokenId = req.body.tokenId;
  const response = await client.verifyIdToken({
    idToken: tokenId,
    requiredAudience: process.env.CLIENT_ID,
  });
  try {
    const { email_verified, name, email, picture } = response.payload;
    if (email_verified) {
      const user=await userModel.findOne({ mailId: email }).exec();
      if (user) {
        const { name, mailId } = user;
       return res.status(200).json( { name, mailId });
      } else {
        const newUser = new userModel({
          name,
          mailId: email,
          image: picture,
        });
        await newUser.save();
        return res.status(200).json({name, mailId: email  });
      }
    } else {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
