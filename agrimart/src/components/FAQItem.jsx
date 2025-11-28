import React, { useState } from "react";
import styles from "../pages/FaqPage.module.css";

const FAQItem = ({ faq, onFeedback }) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ack, setAck] = useState(null); // 'yes' | 'no' | null

  const handleFeedback = async (helpful) => {
    if (!onFeedback) return;
    setSubmitting(true);
    try {
      await onFeedback(faq._id, helpful);
      setAck(helpful ? "yes" : "no");
      setTimeout(() => setAck(null), 2000);
    } catch (err) {
      // parent handles errors; keep UI stable
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className={styles.faqItem}>
      <button
        className={styles.q}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`faq-${faq._id}`}
      >
        <span>{faq.question}</span>
        <span className={styles.qToggle}>{open ? "-" : "+"}</span>
      </button>

      {open && (
        <div id={`faq-${faq._id}`} className={styles.a}>
          <p>{faq.answer}</p>

          <div className={styles.fabRow}>
            <div className={styles.feedback}>
              Was this helpful?{" "}
              {typeof faq.feedback === "number" && (
                <span style={{ marginLeft: 8, fontWeight: 600 }}>
                  {faq.feedback}
                </span>
              )}
            </div>

            <button
              className={styles.helpBtn}
              onClick={() => handleFeedback(true)}
              disabled={submitting}
              aria-pressed={ack === "yes"}
            >
              Yes
            </button>

            <button
              className={styles.notHelpBtn}
              onClick={() => handleFeedback(false)}
              disabled={submitting}
              aria-pressed={ack === "no"}
            >
              No
            </button>

            {ack && (
              <div style={{ marginLeft: 8, color: "#2f9e44" }}>Thanks!</div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default FAQItem;
