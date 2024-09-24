import path from "path";
import Narrative from "../models/Narrative.js";

import MyError from "../utils/myError.js";
import asyncHandler from "express-async-handler";
import paginate from "../utils/paginate.js";
import User from "../models/User.js";

// /Narratives
export const getNarratives = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  [("select", "sort", "page", "limit")].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Narrative);

  const narratives = await Narrative.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: narratives.length,
    data: narratives,
    pagination,
  });
});

export const getNarrative = asyncHandler(async (req, res, next) => {
  const narrative = await Narrative.findById(req.params.id);

  if (!narrative) {
    throw new MyError(req.params.id + " ID-тэй нийтлэл байхгүй байна.", 404);
  }

  narrative.seen += 1;
  narrative.save();

  res.status(200).json({
    success: true,
    data: narrative,
  });
});

export const createNarrative = asyncHandler(async (req, res, next) => {
  const narrative = await Narrative.create(req.body);

  res.status(200).json({
    success: true,
    data: narrative,
  });
});

export const deleteNarrative = asyncHandler(async (req, res, next) => {
  const narrative = await Narrative.findById(req.params.id);

  if (!narrative) {
    throw new MyError(req.params.id + " ID-тэй нийтлэл байхгүй байна.", 404);
  }

  if (
    narrative.createUser.toString() !== req.userId &&
    req.userRole !== "admin"
  ) {
    throw new MyError("Та зөвхөн өөрийнхөө нийтлэлыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  narrative.remove();

  res.status(200).json({
    success: true,
    data: narrative,
    whoDeleted: user.name,
  });
});

export const updateNarrative = asyncHandler(async (req, res, next) => {
  const narrative = await Narrative.findById(req.params.id);

  if (!narrative) {
    throw new MyError(req.params.id + " ID-тэй нийтлэл байхгүйээээ.", 400);
  }

  if (
    narrative.createUser.toString() !== req.userId &&
    req.userRole !== "admin"
  ) {
    throw new MyError("Та зөвхөн өөрийнхөө нийтлэлыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    narrative[attr] = req.body[attr];
  }

  narrative.save();

  res.status(200).json({
    success: true,
    data: narrative,
  });
});
