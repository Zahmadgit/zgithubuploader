import React, { useEffect, useState } from "react";
import useNoteSubFolder from "../Hooks/useNoteSubfolder";
import useEditNote from "../Hooks/useEditNote";
const MapRepoFolder = () => {
  const repoStructure = useNoteSubFolder();
  const [selected, setSelected] = useState("Select a note");
  const [opened, setOpened] = useState(false);

  const { noteContent, setNoteContent } = useEditNote(selected);

  return (
    <div>
      <h1>Select a note to edit</h1>
      <div onClick={() => setOpened((prev) => !prev)}>{selected}</div>
      {opened && (
        <div>
          {repoStructure?.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setSelected(item.path.toString());
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
      <p>{noteContent}</p>
    </div>
  );
};

export default MapRepoFolder;
