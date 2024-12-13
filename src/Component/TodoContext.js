import React, { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {

  //local stroge getItem add
  const [titles, setTitles] = useState(() => {
    try {
      const storedTitles = JSON.parse(localStorage.getItem("titles"));
      return Array.isArray(storedTitles) ? storedTitles : [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [subtitle, setSubtitle] = useState("");
  const [showSubtitleInput, setShowSubtitleInput] = useState(null);
  const [editingSubtitle, setEditingSubtitle] = useState({ titleIndex: null, subtitleIndex: null, text: "" });
  const [showModal, setShowModal] = useState(false);


//local stroge setItem add
  useEffect(() => {
    try {
      localStorage.setItem("titles", JSON.stringify(titles));
    } catch (error) {
      console.error("Error saving titles to localStorage:", error);
    }
  }, [titles]);

  const handleSaveChanges = () => {
    if (title.trim()) {
      if (editingIndex !== null) {
        const updatedTitles = [...titles];
        updatedTitles[editingIndex].title = title.trim();
        setTitles(updatedTitles);
        setEditingIndex(null);
      } else {
        setTitles([...titles, { title: title.trim(), subtitles: [] }]);
      }
      setTitle("");
      setShowModal(false);
    }
  };

  const handleEdit = (index) => {
    setTitle(titles[index].title);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    setTitles(titles.filter((title, del) => del !== index));
  };
  

  const handleAddSubtitle = (index) => {
    if (subtitle.trim()) {
      const updatedTitles = [...titles];
      updatedTitles[index].subtitles.push(subtitle.trim());
      setTitles(updatedTitles);
      setSubtitle("");
      setShowSubtitleInput(null);
    }
  };

  const handleEditSubtitle = (titleIndex, subtitleIndex, text) => {
    setEditingSubtitle({ titleIndex, subtitleIndex, text });
  };

  const handleUpdateSubtitle = () => {
    const { titleIndex, subtitleIndex, text } = editingSubtitle;
    if (text.trim()) {
      const updatedTitles = [...titles];
      updatedTitles[titleIndex].subtitles[subtitleIndex] = text.trim();
      setTitles(updatedTitles);
      setEditingSubtitle({ titleIndex: null, subtitleIndex: null, text: "" });
    }
  };

  const handleDeleteSubtitle = (titleIndex, subtitleIndex) => {
    const updatedTitles = [...titles];
    updatedTitles[titleIndex].subtitles.splice(subtitleIndex, 1);
    setTitles(updatedTitles);
  };


// Drag and drop functionality

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    if (result.type === "TITLE") {
      const reorderedTitles = Array.from(titles);
      const [movedItem] = reorderedTitles.splice(result.source.index, 1);
      reorderedTitles.splice(result.destination.index, 0, movedItem);
      setTitles(reorderedTitles);
    } else if (result.type === "SUBTITLE") {
      const sourceTitleIndex = parseInt(result.source.droppableId, 10);
      const destTitleIndex = parseInt(result.destination.droppableId, 10);

      const sourceSubtitles = [...titles[sourceTitleIndex].subtitles];
      const [movedSubtitle] = sourceSubtitles.splice(result.source.index, 1);

      if (sourceTitleIndex === destTitleIndex) {
        sourceSubtitles.splice(result.destination.index, 0, movedSubtitle);
        const updatedTitles = [...titles];
        updatedTitles[sourceTitleIndex].subtitles = sourceSubtitles;
        setTitles(updatedTitles);
      } else {
        const destSubtitles = [...titles[destTitleIndex].subtitles];
        destSubtitles.splice(result.destination.index, 0, movedSubtitle);

        const updatedTitles = [...titles];
        updatedTitles[sourceTitleIndex].subtitles = sourceSubtitles;
        updatedTitles[destTitleIndex].subtitles = destSubtitles;
        setTitles(updatedTitles);
      }
    }
  };

  return (

    // avoid prop drilling used
    <TodoContext.Provider
      value={{
        titles,
        title,
        subtitle,
        showSubtitleInput,
        editingSubtitle,
        showModal,
        setTitle,
        setSubtitle,
        setShowModal,
        setShowSubtitleInput,
        handleSaveChanges,
        handleEdit,
        handleDelete,
        handleAddSubtitle,
        handleEditSubtitle,
        handleUpdateSubtitle,
        handleDeleteSubtitle,
        handleDragEnd,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
