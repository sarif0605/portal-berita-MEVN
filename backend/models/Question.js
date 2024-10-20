import mongoose from "mongoose";
import validator from "validator";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
    unique: [true, "Title already exists"],
  },
  question: {
    type: String,
    required: [true, "Please provide question"],
  },
  category: {
    type: String,
    enum: ["frontend", "backend", "fullstack"],
    required: [true, "Please provide category"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user id"],
  },
  countVote: {
    type: Number,
    default: 0,
  },
  timestamps: true,
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
