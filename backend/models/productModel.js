import mongoose from "mongoose";

// Video number 19 (Modeling our Data) ------------
// Brad: "reviews's gonna be an array of review objects, so we're actually gonna
// have a seperate Schema called reviewSchema, and we could put this in a seperate file,
// but it's small enough and this is the only place we're using it, so i'm just gonna
// put it right above the product schema... const reviewSchema, set it to mongoose.Schema,
// passing an object here, and this is gonna have a name, type String, and required true
// ... and I'm just gonna copy this down twice, in addition to name we want the rating
// ... so this is gonna be the individual review rating, the rating down here is gonna
// be the average of all of the review ratings ... ...

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
