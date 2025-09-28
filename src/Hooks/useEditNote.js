import React, { useEffect, useState } from "react";

const useEditNote = (note) => {
  const [noteContent, setNoteContent] = useState([]);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const results = await window.editNoteAPI.fetchEditNote(note);
        if (results.success) {
          setNoteContent(results.data);
          console.log(results.data);
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
