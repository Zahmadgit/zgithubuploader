import React, { useState } from "react";

export default function NoteUploader() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !note) {
      setMessage("Title and note are required");
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      const result = await window.githubAPI.uploadNote({
        owner: "Zahmadgit",
        repo: "notes",
        title: trimmedTitle,
        note,
      });
      if (result?.success) {
        setMessage("Note uploaded successfully yayyy");
        setTitle("");
        setNote("");
      } else {
        setMessage(`fuck: ${result?.error || "Unknown error"}`);
      }
    } catch (e) {
      setMessage(`fuck: ${e?.message || e}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Create a note</h3>
      <div>
        <label htmlFor="titleInput">Title:</label>
        <input
          id="titleInput"
          type="text"
          placeholder="My Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <textarea
        id="noteInput"
        rows={10}
        cols={50}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <br />
      <button onClick={handleUpload} disabled={isLoading} id="uploadBtn">
        {isLoading ? "Uploading..." : "Upload Note"}
      </button>
      {message && <p style={{ marginTop: 8 }}>{message}</p>}
    </div>
  );
}
