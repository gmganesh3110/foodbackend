import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
      });
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser.toObject());
  } catch (err: any) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById({ _id: req.userId });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;
    await user.save();
    res.status(200).json(user);
  } catch (err: any) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser=await User.findOne({_id:req.userId  })
    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(currentUser)
  } catch (err:any) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default { createCurrentUser, updateCurrentUser, getCurrentUser };
