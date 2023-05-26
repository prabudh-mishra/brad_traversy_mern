const asyncHandler = require("express-async-handler");

/*
 * @desc    Get all goals
 * @route   GET /api/goals
 * @access  Private
 */
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get goals",
  });
});

/*
 * @desc    Create goal
 * @route   POST /api/goals
 * @access  Private
 */
const setGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Create goal",
  });
});

/*
 * @desc    Update goal
 * @route   PUT /api/goals/:id
 * @access  Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Update goal ${req.params.id}`,
  });
});

/*
 * @desc    Delete goal
 * @route   DELETE /api/goals/:id
 * @access  Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete goal ${req.params.id}`,
  });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
