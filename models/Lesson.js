import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
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
    video: {
      url: String,
      blurHash: String,
      thumbnail: String,
    },
    description: {
      type: String,
      required: [true, "Номын тайлбарыг оруулна уу"],
    },
    seen: {
      type: Number,
      default: 0,
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

export default mongoose.model("Lesson", LessonSchema);
