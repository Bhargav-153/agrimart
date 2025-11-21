import React, { useState } from "react";
import styles from "./SupportTicket.module.css";
import { createSupportTicket } from "../api/supportApi";
import { FaCheckCircle, FaHeadset, FaTicketAlt } from "react-icons/fa";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  orderId: "",
  category: "general",
  priority: "medium",
  message: "",
};

const SupportTicket = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setResult(null);

    try {
      const data = await createSupportTicket(form);
      setResult(data.ticket);
      setForm(initialForm);
    } catch (err) {
      setError(err.message || "Unable to submit ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.ticketCard}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Raise a support ticket</p>
            <h1>We're here to help 24/7</h1>
            <p className={styles.lead}>
              Share details about your issue and our support engineers will follow up
              within a few hours.
            </p>
          </div>
          <FaHeadset className={styles.headerIcon} />
        </header>

        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Priya Sharma"
                required
              />
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="phone">Phone (optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label htmlFor="orderId">Order ID (optional)</label>
                <input
                  id="orderId"
                  name="orderId"
                  type="text"
                  value={form.orderId}
                  onChange={handleChange}
                  placeholder="e.g. ORD-1034"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="general">General</option>
                  <option value="order">Order</option>
                  <option value="payment">Payment</option>
                  <option value="product">Product</option>
                  <option value="account">Account</option>
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="message">Describe the issue</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                placeholder="Include dates, order numbers, screenshots links..."
                required
              ></textarea>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit ticket"}
            </button>
          </form>

          <aside className={styles.sidebar}>
            <div className={styles.tipCard}>
              <FaTicketAlt />
              <h3>What happens next?</h3>
              <ul>
                <li>Ticket ID is generated instantly.</li>
                <li>Support team reviews your case.</li>
                <li>Response shared via email/phone.</li>
              </ul>
            </div>
            <div className={styles.tipCard}>
              <FaCheckCircle />
              <h3>Faster resolution tips</h3>
              <ul>
                <li>Add order IDs for delivery issues.</li>
                <li>Mention payment reference if applicable.</li>
                <li>Upload screenshots via any link if needed.</li>
              </ul>
            </div>
          </aside>
        </div>

        {result && (
          <div className={styles.successBanner}>
            <p>
              ✅ Ticket <strong>{result._id}</strong> created. We'll reach out at{" "}
              <strong>{result.email}</strong>.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SupportTicket;

