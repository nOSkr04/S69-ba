import path from "path";
import Exercise from "../models/Exercise.js";

import MyError from "../utils/myError.js";
import asyncHandler from "express-async-handler";
import paginate from "../utils/paginate.js";
import User from "../models/User.js";

// /exercises
export const getExercises = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  [("select", "sort", "page", "limit")].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Exercise);

  const exercises = await Exercise.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: exercises.length,
    data: exercises,
    pagination,
  });
});

export const getExercise = asyncHandler(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);

  if (!exercise) {
    throw new MyError(req.params.id + " ID-тэй нийтлэл байхгүй байна.", 404);
  }

  exercise.seen += 1;
  exercise.save();

  res.status(200).json({
    success: true,
    data: exercise,
  });
});

export const createExercise = asyncHandler(async (req, res, next) => {
  const exercise = await Exercise.create(req.body);

  res.status(200).json({
    success: true,
    data: exercise,
  });
});

export const deleteExercise = asyncHandler(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);

  if (!exercise) {
    throw new MyError(req.params.id + " ID-тэй нийтлэл байхгүй байна.", 404);
  }

  if (req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө нийтлэлыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  exercise.remove();

  res.status(200).json({
    success: true,
    data: exercise,
    whoDeleted: user.name,
  });
});

export const updateExercise = asyncHandler(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);

  if (!exercise) {
    throw new MyError(req.params.id + " ID-тэй нийтлэл байхгүйээээ.", 400);
  }

  if (
    exercise.createUser.toString() !== req.userId &&
    req.userRole !== "admin"
  ) {
    throw new MyError("Та зөвхөн өөрийнхөө нийтлэлыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    exercise[attr] = req.body[attr];
  }

  exercise.save();

  res.status(200).json({
    success: true,
    data: exercise,
  });
});
