// const mongoose = require('mongoose');
import { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema({
  feedback: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    maxlength: [3000, " Your feedback cannot be longer than 3000 characters"],
  },

  name: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    maxlength: [35, " Your name cannot be longer than 35 characters"],
  },

  email: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    maxlength: [35, " The Emailcannot be longer than 34 characters"],
  },
});
const Feedback = models.Feedback || model("Feedback", FeedbackSchema);

export default Feedback;
