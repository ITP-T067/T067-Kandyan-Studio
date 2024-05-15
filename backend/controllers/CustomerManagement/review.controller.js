const ReviewModel = require("../../models/CustomerManagement/review.modle");

const addreview = async (req, res, next) => {
  const { date, message } = req.body;
  try {
    const newReview = new ReviewModel({
      date,
      message,
    });

    await newReview.save();

    res.status(200).json({ success: true, message: "Review was added" });
  } catch (error) {
    next(error);
  }
};

const displayreview = async (req, res, next) => {
  try {
    const tabledata = await ReviewModel.find();
    res.status(200).json(tabledata);
  } catch (error) {
    next(error);
  }
};

const updatereview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    console.log(id + " " + message);

    const updatedReview = await ReviewModel.findByIdAndUpdate(
      id,
      {
        $set: {
          message,
        },
      },
      { new: true }
    );
    console.log(updatedReview);

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ReviewModel.findByIdAndDelete(id);

    res.json({ message: "Review deleted successfully", id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addreview,
  displayreview,
  updatereview,
  deleteReview,
};