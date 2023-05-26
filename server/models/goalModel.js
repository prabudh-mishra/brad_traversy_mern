const mongoose = require("mongoose");

// create goalSchema with fields text and timestamps

const goalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a goal text"],
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
