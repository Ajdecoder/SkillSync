import Notification from "../../model/notification.js";

const CandidatesNotifications = async function (req, res) {
  try {
    const notifications = await Notification.find().populate("recipient");
    res.status(200).send({ notifications });
  } catch (error) {
    console.log(error);
  }
};


export const CandidatesNotificationsById = async function (req, res) {
  try {
    if (!req.params.notificationId) {
      return res.status(400).json({ message: "Notification ID is required." });
    }
    const notifications = await Notification.findById(req.body.notificationId).populate("recipient");
    console.log(req.params)
    res.status(200).send({ notifications });
  } catch (error) {
    console.log(error);
  }
}

export default CandidatesNotifications;
