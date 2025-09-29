import React, { useEffect, useState } from "react";
import useNoteSubFolder from "../Hooks/useNoteSubfolder";
import useEditNote from "../Hooks/useEditNote";

export default function NoteUploader() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const repoStructure = useNoteSubFolder();
  const [selected, setSelected] = useState("Select a note");
  const [opened, setOpened] = useState(false);

  const { noteContent, setNoteContent } = useEditNote(selected);

  //noteContent changes when a selection is made so then we can populate notes
  useEffect(() => {
    if (noteContent) {
      setNote(noteContent);
    }
  }, [noteContent]);
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
      <div>
        <div>
          <h1>
            Select a note to edit with the dropdown or just make a new one
          </h1>
          <div onClick={() => setOpened((prev) => !prev)}>{selected}</div>
          {opened && (
            <div>
              {repoStructure?.map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    setSelected(item.path.toString());
                    //string manipulation needs to be done to clean the title name
                    setTitle(
                      item.name
                        .toString()
                        .replace(/^notes\//, "")
                        .replace(/\.md$/, "")
                    );

                    console.log(
                      "this is the selected path: ",
                      item.path,
                      typeof item.path
                    );
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}

          <h2>Selected Note: {selected}</h2>
        </div>
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
