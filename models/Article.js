import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Нийтлэлийн гарчиг оруулна уу"],
      unique: true,
      trim: true,
      maxlength: [
        250,
        "Нийтлэлийн гарчиг урт дээд тал нь 250 тэмдэгт байх ёстой.",
      ],
    },
    image: {
      url: String,
      blurHash: String,
    },
    description: {
      type: String,
      required: [true, "Номын тайлбарыг оруулна уу"],
    },
    seen: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    updateUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.model("Article", ArticleSchema);
