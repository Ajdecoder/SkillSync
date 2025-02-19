import Notification from "../model/notification.js";

export const NotificationAsRead = async function (req, res) {
  const { notificationId } = req.body;

  if (!notificationId) {
    return res.status(400).json({ message: "Notification ID is required." });
  }

  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    return res
      .status(200)
      .json({ message: "Notification marked as read.", notification });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the notification." });
  }
};

export const Notifications = async function (req, res) {
  try {
    const notifications = await Notification.find().populate("recipient");
    console.log(notifications);
    res.status(200).send({ notifications });
  } catch (error) {
    console.log(error);
  }
};


export const NotificationsById = async function (req, res) {
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
