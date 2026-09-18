import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE_URL);
      setNotes(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch notes.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await axios.post(API_BASE_URL, { title, content });
      setNotes((prevNotes) => [res.data, ...prevNotes]);
      setTitle("");
      setContent("");
    } catch (err) {
      alert("Error creating note: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      alert("Error deleting note: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Student Notes App</h1>
      </header>

      <section className="form-card">
        <h2>Add a Note</h2>
        <form onSubmit={handleCreateNote}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Note Content"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Note</button>
        </form>
      </section>

      <section className="notes-container">
        <h2>Persisted Notes</h2>
        {loading && <p className="status-msg">Loading notes...</p>}
        {error && <p className="status-msg error">{error}</p>}

        {!loading && notes.length === 0 && (
          <p className="status-msg">No notes yet — add one above!</p>
        )}

        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              <div className="note-header">
                <h3>{note.title}</h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteNote(note._id)}
                >
                  Delete
                </button>
              </div>
              <p className="note-body">{note.content}</p>
              <small className="note-date">
                {new Date(note.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}