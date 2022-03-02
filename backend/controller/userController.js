const { OAuth2Client } = require("google-auth-library");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

const client = new OAuth2Client(process.env.CLIENT_ID);

exports.getCurrentUser = async (req, res) => {
  const data = req.user;
  if (data)
    res
      .status(200)
      .json({ name: data.name, mailId: data.mailId, isAuth: true });
  else res.status(200).json({ isAuth: false });
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
      req.session.isAuthenticated = true;
      const user = await userModel.findOne({ mailId: email }).exec();
      if (user) {
        const { name, mailId } = user;
        req.session.user = user;
        req.session.save();
        return res.status(200).json({ name, mailId, isAuth: true });
      } else {
        const newUser = new userModel({
          name,
          mailId: email,
          image: picture,
        });
        await newUser.save();
        req.session.user = newUser;
        req.session.save();
        return res.status(200).json({ name, mailId: email, isAuth: true });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong",
        isAuth: true,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      isAuth: true,
    });
  }
};
