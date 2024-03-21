import OpenAI from "openai";
import asyncHandler from "express-async-handler";

export const imageAi = asyncHandler(async (req, res, next) => {
  const openai = new OpenAI({
    apiKey: "",
  });

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: req.body.promt,
    n: 1,
    size: "1024x1024",
  });
  res.status(200).json({ response });
});

export const textAi = asyncHandler(async (req, res, next) => {
  const openai = new OpenAI({
    apiKey: "",
  });
  const completion = await openai.chat.completions.create({
    messages: req.body.data,
    model: "gpt-3.5-turbo",
  });
  res.status(200).json({
    completion,
  });
});
