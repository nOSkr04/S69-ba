import path from "path";
import Lesson from "../models/Lesson.js";

import MyError from "../utils/myError.js";
import asyncHandler from "express-async-handler";
import paginate from "../utils/paginate.js";
import User from "../models/User.js";

// /lessons
export const getLessons = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  [("select", "sort", "page", "limit")].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Lesson);

  const lessons = await Lesson.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: lessons.length,
    data: lessons,
    pagination,
  });
});

export const getLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    throw new MyError(req.params.id + " ID-тэй нийтлэл байхгүй байна.", 404);
  }

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

export const createLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.create(req.body);

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

export const deleteLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    throw new MyError(req.params.id + " ID-тэй нийтлэл байхгүй байна.", 404);
  }

  if (lesson.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө нийтлэлыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  lesson.remove();

  res.status(200).json({
    success: true,
    data: lesson,
    whoDeleted: user.name,
  });
});

export const updateLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    throw new MyError(req.params.id + " ID-тэй нийтлэл байхгүйээээ.", 400);
  }

  if (lesson.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө нийтлэлыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    lesson[attr] = req.body[attr];
  }

  lesson.save();

  res.status(200).json({
    success: true,
    data: lesson,
  });
});
