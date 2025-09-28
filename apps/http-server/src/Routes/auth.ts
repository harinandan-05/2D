import express, { Router } from "express";
import { prismaClient } from "@repo/database/client";
import bcrypt, { compare, genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const auth: Router = express.Router();

auth.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ msg: "fill all credentials" });
    }

    const exitsing = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (exitsing) {
      return res.status(400).json({ msg: "user already exist" });
    }

    const salt = await genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await prismaClient.user.create({
      data: {
        username: username,
        email: email,
        password: passwordHash,
      },
    });
    if (!newUser) {
      return res.status(400).json({ msg: "failed to signup" });
    }
    return res.status(200).json({ msg: "signedup" });
  } catch (err) {
    console.log(err);
  }
});

auth.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "fill all inputs" });
    }
    const findUser = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!findUser) {
      return res.status(400).json({ msg: "no user with this email" });
    }

    const Compare = await bcrypt.compare(password, findUser.password);
    if (!compare) {
      return res.status(404).json({ msg: "password mismatch" });
    }

    console.log("secret", process.env.JWT_SECRET as string);

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string);
    if (!token) {
      return res.status(400).json({ msg: "failed to generate token" });
    }
    return res.status(200).json({ msg: "loged in", token });
  } catch (err) {
    return res.status(500).json({ msg: "internal server error" });
  }
});

export default auth;
