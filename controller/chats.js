import OpenAI from "openai";
import asyncHandler from "express-async-handler";
import ChatText from "../models/ChatText.js";
import ChatImage from "../models/ChatImage.js";
export const imageAi = asyncHandler(async (req, res, next) => {
  const { promt } = req.body;
  await ChatImage.create({
    role: "user",
    content: promt,
  });
  const openai = new OpenAI({
    apiKey: "",
  });
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: promt,
    n: 1,
    size: "1024x1024",
  });
  await ChatImage.create({
    role: "image",
    content: response?.data?.[0]?.url,
  });
  res.status(200).json({ response });
});

export const textAi = asyncHandler(async (req, res, next) => {
  const { data } = req.body;
  await ChatText.create({
    role: "user",
    content: data[data?.lenth - 1],
  });
  const openai = new OpenAI({
    apiKey: "",
  });
  const completion = await openai.chat.completions.create({
    messages: data,
    model: "gpt-3.5-turbo",
  });
  await ChatText.create(completion?.choices[0]?.message);
  res.status(200).json({
    completion,
  });
});

export const getTextAi = asyncHandler(async (req, res) => {
  const chatText = await ChatText.find();
  res.status(200).json({ data: chatText, success: true });
});

export const getImageAi = asyncHandler(async (req, res) => {
  const chatImage = await ChatImage.find();
  res.status(200).json({ data: chatImage, success: true });
});
