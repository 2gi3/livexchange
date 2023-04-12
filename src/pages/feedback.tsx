import React, { useState } from "react";
import styles from "../styles/feedbackForm.module.css";

const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, name, email }),
      });
      if (response.ok) {
        setFeedback("");
        setName("");
        setEmail("");
      } else {
        console.error("Error submitting feedback:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formControl}>
        <label htmlFor="feedback">Your feedback</label>
        <textarea
          id="feedback"
          name="feedback"
          rows={5}
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          required
        ></textarea>
      </div>
      <div className={styles.formControl}>
        <label htmlFor="name">Your name (optional)</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={35}
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="email">Your email (optional)</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          maxLength={35}
        />
      </div>
      <button type="submit">Submit feedback</button>
    </form>
  );
};

export default FeedbackForm;
