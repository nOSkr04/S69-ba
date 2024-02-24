import path from "path";
import Article from "../models/Article.js";
import Lesson from "../models/Lesson.js";
import Advice from "../models/Advice.js";
import Story from "../models/Story.js";

import MyError from "../utils/myError.js";
import asyncHandler from "express-async-handler";
import paginate from "../utils/paginate.js";
import User from "../models/User.js";

// /articles
export const getArticles = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = "title seen image createdAt";

  [("select", "sort", "page", "limit")].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Article);

  const articles = await Article.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: articles.length,
    data: articles,
    pagination,
  });
});

export const getWebHome = asyncHandler(async (req, res, next) => {
  // const articles = await Article.find().limit(3).skip();
  // const lessons = await Lesson.find().limit(3);
  // const advices = await Advice.find().limit(3);
  // const stories = await Story.find().limit(3);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  res.status(200).json({
    success: true,
    // count: articles.length,
    // data: articles,
  });
});

export const articleHome = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const sort = req.query.sort;
  const select = req.query.select;
  [("select", "sort", "page", "limit")].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Article);

  const articles = await Article.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  const filterArticles = await Article.findOne().sort({
    seen: -1,
  });

  const filtered = articles.filter(
    (article) => article.title !== filterArticles.title
  );

  res.status(200).json({
    success: true,
    count: articles.length,
    data: filtered,
    popular: filterArticles,
    pagination,
  });
});

export const getArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  article.seen += 1;
  article.save();

  res.status(200).json({
    success: true,
    data: article,
  });
});

export const createArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.create(req.body);

  res.status(200).json({
    success: true,
    data: article,
  });
});

export const deleteArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  if (req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  article.remove();

  res.status(200).json({
    success: true,
    data: article,
    whoDeleted: user.name,
  });
});

export const updateArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  if (
    article.createUser.toString() !== req.userId &&
    req.userRole !== "admin"
  ) {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    article[attr] = req.body[attr];
  }

  article.save();

  res.status(200).json({
    success: true,
    data: article,
  });
});
