import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Сургалт гарчиг оруулна уу"],
      unique: true,
      trim: true,
      maxlength: [
        250,
        "Сургалт гарчиг урт дээд тал нь 250 тэмдэгт байх ёстой.",
      ],
    },
    description: {
      type: String,
      required: [true, "Номын тайлбарыг оруулна уу"],
    },
    image: {
      url: String,
      blurHash: String,
    },
    images: [
      {
        url: String,
        blurHash: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    seen: {
      type: Number,
      default: 0,
    },
    isSport: {
      type: Boolean,
      default: false,
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

export default mongoose.model("Exercise", ExerciseSchema);
