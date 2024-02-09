import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Зөвлөгөө гарчиг оруулна уу"],
      unique: true,
      trim: true,
      maxlength: [
        250,
        "Зөвлөгөө гарчиг урт дээд тал нь 250 тэмдэгт байх ёстой.",
      ],
    },
    image: {
      url: String,
      blurHash: String,
    },
    description: {
      type: String,
      required: [true, "Зөвлөгөө тайлбарыг оруулна уу"],
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
