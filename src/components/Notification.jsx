import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";
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

  const isError = notification.type === "error";
  const Icon = isError ? FaTimesCircle : FaCheckCircle;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className={`fixed top-6 right-6 z-50 min-w-[280px] max-w-md rounded-xl backdrop-blur-xl shadow-2xl overflow-hidden ${
          isError
            ? "bg-rose-500/10 border border-rose-500/30"
            : "bg-emerald-500/10 border border-emerald-500/30"
        }`}
      >
        <div className="p-4 flex items-start">
          <div
            className={`flex-shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center ${
              isError ? "bg-rose-500/20" : "bg-emerald-500/20"
            }`}
          >
            <Icon
              className={
                isError ? "text-rose-500 text-lg" : "text-emerald-500 text-lg"
              }
            />
          </div>

          <div className="ml-3 flex-1">
            <p className="font-medium text-white/90">{notification.message}</p>
          </div>

          <button
            onClick={clearNotification}
            className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <FaTimes className="text-white/70 hover:text-white" />
          </button>
        </div>

        <motion.div
          className={`h-1 ${isError ? "bg-rose-500/50" : "bg-emerald-500/50"}`}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 3, ease: "linear" }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
motion;
export default Notification;
