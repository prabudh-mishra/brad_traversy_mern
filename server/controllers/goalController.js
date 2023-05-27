const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

/*
 * @desc    Get all goals
 * @route   GET /api/goals
 * @access  Private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

/*
 * @desc    Create goal
 * @route   POST /api/goals
 * @access  Private
 */
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Text is required");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
    // description: req.body.description,
  });

  res.status(200).json(goal);
});

/*
 * @desc    Update goal
 * @route   PUT /api/goals/:id
 * @access  Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id).select("-password");
  // Check if user owns goal
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure user owns goal
  if (user.id.toString() !== goal.user.toString()) {
    res.status(401);
    throw new Error("User not authorized to delete this goal");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedGoal);
});

/*
 * @desc    Delete goal
 * @route   DELETE /api/goals/:id
 * @access  Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id).select("-password");
  // Check if user owns goal
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure user owns goal
  if (user.id.toString() !== goal.user.toString()) {
    res.status(401);
    throw new Error("User not authorized to delete this goal");
  }

  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: `Deleted goal "${deletedGoal.text}"`,
    id: deletedGoal._id,
  });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
