import React, { useEffect, useState } from "react";

const useEditNote = (note) => {
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    //this is probably fine... even if I named a note's title "Select a note", its path would be note/select-a-note.md
    if (note === "Select a note") {
      return;
    }
    const fetchRepoData = async () => {
      try {
        const results = await window.editNoteAPI.fetchEditNote(note);
        if (results.success) {
          setNoteContent(results.data.decoded || "");
          console.log("decoded note:" + results.data.decoded);
        } else {
          console.log("Error fetching repo:", results.error);
        }
      } catch (e) {
        console.log("Bruh: ", e);
      }
    };
    fetchRepoData();
  }, [note]);
  return { noteContent, setNoteContent };
};

export default useEditNote;
