import { useState, useRef } from "react";
import "./AnnouncementForm.css"; // We'll create this CSS file

const AnnouncementForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [bodyError, setBodyError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = !body || body.trim() === "";
    setBodyError(isEmpty);

    if (!isEmpty) {
      console.log({ title, body, issued_by: issuedBy });
      // Submit logic here
    }
  };

  return (
    <div className="announcement-card">
      <div className="card-header">
        <h3>Create Announcement</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="announcement-form">
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
              className={bodyError ? "is-invalid" : ""}
            />
            {bodyError && (
              <div className="error-message">Message is required.</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="issued_by">Issued by</label>
            <input
              id="issued_by"
              type="text"
              placeholder="Enter the issuer"
              value={issuedBy}
              onChange={(e) => setIssuedBy(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;

