import { Bookmars } from "../../db/database";

export const BookmarkJobs = (req, res) => {
  const { userId, jobId } = req.body;
  if (!userId || !jobId) {
    return res
      .status(400)
      .json({ message: "User ID and Job ID are required." });
  }
  const newBookmark = new Bookmars({ userId, jobId });
  newBookmark
    .save()
    .then((bookmark) => {
      res
        .status(200)
        .json({ message: "Job bookmarked successfully.", bookmark });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "An error occurred while bookmarking the job." });
    });
};
