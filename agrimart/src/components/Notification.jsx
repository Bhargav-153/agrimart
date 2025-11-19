import { useEffect, useState } from "react";
import { getNotifications } from "@/pages/NotificationApi";
import styles from "./Notification.module.css";

function Notifications({ userId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getNotifications(userId);
        const list = Array.isArray(data) ? data : [];
        // show only the most recent six
        setNotes(list.slice(0, 6));
      } catch (err) {
        setError(err.message || "Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // allow other parts of the app to push a new notification into the UI
    const handleNewNotification = (e) => {
      const newNote = e?.detail;
      if (!newNote) return;
      setNotes((prev) => {
        const deduped = prev.filter((n) => n._id !== newNote._id);
        const combined = [newNote, ...deduped];
        return combined.slice(0, 6);
      });
    };

    window.addEventListener("agrimart:newNotification", handleNewNotification);

    return () => {
      window.removeEventListener(
        "agrimart:newNotification",
        handleNewNotification
      );
    };
  }, [userId]);

  if (!userId) {
    return (
      <div className={styles.box}>
        <p className={styles.empty}>Log in to view notifications.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <h3 className={styles.heading}>Recent Notifications</h3>
        {loading && <p className={styles.info}>Loading notifications...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && notes.length === 0 && (
          <p className={styles.empty}>No notifications yet.</p>
        )}
        <div className={styles.list}>
          {notes.map((note) => (
            <div className={styles.item} key={note._id}>
              <div>
                <p className={styles.title}>{note.title}</p>
                <p className={styles.message}>{note.message}</p>
              </div>
              <span className={styles.meta}>
                {new Date(note.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
