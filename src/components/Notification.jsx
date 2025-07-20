import { useEffect } from "react";
import useTeamStore from "../store/teamStore";

const Notification = () => {
  const { notification, clearNotification } = useTeamStore();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  const bgColor =
    notification.type === "error" ? "bg-red-500/90" : "bg-green-500/90";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-xl shadow-lg z-50 animate-fade-in`}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
