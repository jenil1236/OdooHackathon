import React, { useState } from "react";
import "./AnnouncementForm.css";

const AnnouncementForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  // Add this handleSubmit function here ▼
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/routes/announcements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            body,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit announcement");
      }

      const data = await response.json();
      console.log("Announcement created:", data);
      // Reset form
      setTitle("");
      setBody("");
      setError(null);
    } catch (error) {
      console.error("Error submitting announcement:", error);
      setError(error.message);
    }
  };

  return (
    <div className="announcement-card">
      <div className="card-header">
        <h3>Create Announcement</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="announcement-form">
          {/* Your existing form fields */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Message</label>
            <textarea
              id="body"
              placeholder="Write your announcement here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;
