import Notification from "../../model/notification.js";

const CandidatesNotifications = async function (req, res) {
  try {
    const notifications = await Notification.find();
    res.status(200).send({ notifications });
  } catch (error) {
    console.log(error);
  }
};

export default CandidatesNotifications;
