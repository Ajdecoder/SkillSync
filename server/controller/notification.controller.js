import Notification from "../model/notification.js";

export const NotificationAsRead = async function (req, res) {
    const { notificationId } = req.body;
  
    // Check if the notificationId is provided
    if (!notificationId) {
      return res.status(400).json({ message: "Notification ID is required." });
    }
  
    try {
      // Update the notification's read field to true
      const notification = await Notification.findByIdAndUpdate(
        notificationId,  // Find the notification by ID
        { read: true },   // Update the 'read' field
        { new: true }     // Return the updated document
      );
  
      // If notification not found
      if (!notification) {
        return res.status(404).json({ message: "Notification not found." });
      }
  
      // Send the updated notification back in the response
      return res.status(200).json({ message: "Notification marked as read.", notification });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred while updating the notification." });
    }
  };
  