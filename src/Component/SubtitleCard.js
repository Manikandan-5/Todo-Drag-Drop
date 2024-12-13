import React, { useContext, useRef, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { TodoContext } from "./TodoContext";

const SubtitleCard = ({ titleIndex, item }) => {
  const {
    subtitle,
    setSubtitle,
    showSubtitleInput,
    setShowSubtitleInput,
    editingSubtitle,
    handleEditSubtitle,
    handleUpdateSubtitle,
    handleDeleteSubtitle,
    handleAddSubtitle,
  } = useContext(TodoContext);

  const addInputRef = useRef(null);
  const editInputRef = useRef(null);

// focus input field add mode
  useEffect(() => {
    if (showSubtitleInput === titleIndex && addInputRef.current) {
      addInputRef.current.focus();
    }
  }, [showSubtitleInput, titleIndex]);

  // focus input field edit mode
  useEffect(() => {
    if (
      editingSubtitle.titleIndex === titleIndex &&
      editingSubtitle.subtitleIndex !== null &&
      editInputRef.current
    ) {
      editInputRef.current.focus();
    }
  }, [editingSubtitle, titleIndex]);


  return (
    <Droppable droppableId={`${titleIndex}`} type="SUBTITLE">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
   
          <ul className="list-group  " style={{ height: '150px', overflowY: 'auto' }}>
  {item.subtitles.map((subtitle, subIndex) => (
    <Draggable key={subIndex} draggableId={`subtitle-${titleIndex}-${subIndex}`} index={subIndex}>
      {(provided) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center card m-2 "
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
            {/* edit task */}
          {editingSubtitle.titleIndex === titleIndex &&
          editingSubtitle.subtitleIndex === subIndex ? (
            <input
              type="text"
              className="form-control"
              value={editingSubtitle.text}
              onChange={(e) => handleEditSubtitle(titleIndex, subIndex, e.target.value)}
              ref={editInputRef} // Attach the ref for editing
            />
          ) : (
            <span>{subtitle}</span>
          )}
          <div>
            {editingSubtitle.titleIndex === titleIndex &&
            editingSubtitle.subtitleIndex === subIndex ? (
              <>
                <button className="btn text-white btn-sm my-2"
                          style={{backgroundColor:"#5710d9"}}
                          onClick={handleUpdateSubtitle} >
                <i class="bi bi-check2-circle"></i> Save 
                </button>
               &nbsp;
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleEditSubtitle(null, null, "")}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn  btn-sm me-2"
                  style={{color:"#5710d9"}}
                  
                  onClick={() => handleEditSubtitle(titleIndex, subIndex, subtitle)}
                >
                <i className="bi bi-pencil-fill fs-5"></i>
                </button>
                <button
                  className="btn  btn-sm"
                  style={{color:"#5710d9"}}

                  onClick={() => handleDeleteSubtitle(titleIndex, subIndex)}
                >
                  <i className="bi bi-trash-fill fs-5"></i>
                </button>
              </>
            )}
          </div>
        </li>
      )}
    </Draggable>
  ))}
  {provided.placeholder}
</ul>

  {/* Add task */}

          {showSubtitleInput === titleIndex ? (
            <div className="mt-2">
              <input
                ref={addInputRef} 
                type="text"
                className="form-control"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
              <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => handleAddSubtitle(titleIndex)}
              >
                Add
              </button>
              &nbsp;

              <button
                className="btn btn-secondary btn-sm mt-2"
                onClick={() => setShowSubtitleInput(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
               style={{backgroundColor:"#5710d9"}}
              className="btn text-white btn-sm mt-3 "
              onClick={() => setShowSubtitleInput(titleIndex)}
            >
              Add Task
            </button>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default SubtitleCard;
