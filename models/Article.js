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
    media: {
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

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
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

// BookSchema.statics.computeCategoryAveragePrice = async function (catId) {
//   const obj = await this.aggregate([
//     { $match: { category: catId } },
//     { $group: { _id: "$category", avgPrice: { $avg: "$price" } } },
//   ]);

//   console.log(obj);
//   let avgPrice = null;

//   if (obj.length > 0) avgPrice = obj[0].avgPrice;

//   await this.model("Category").findByIdAndUpdate(catId, {
//     averagePrice: avgPrice,
//   });

//   return obj;
// };

// BookSchema.post("save", function () {
//   this.constructor.computeCategoryAveragePrice(this.category);
// });

// BookSchema.post("remove", function () {
//   this.constructor.computeCategoryAveragePrice(this.category);
// });

// BookSchema.virtual("zohiogch").get(function () {
//   // this.author
//   if (!this.author) return "";

//   let tokens = this.author.split(" ");
//   if (tokens.length === 1) tokens = this.author.split(".");
//   if (tokens.length === 2) return tokens[1];

//   return tokens[0];
// });

export default mongoose.model("Article", ArticleSchema);
