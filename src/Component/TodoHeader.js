import React, { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TodoModal from "./TodoModal";
import SubtitleCard from "./SubtitleCard";
import { TodoContext } from "./TodoContext";

const TodoHeader = () => {
  const {
    titles,
    title,
    showModal,
    setShowModal,
    setTitle,
    handleSaveChanges,
    handleEdit,
    handleDelete,
    handleDragEnd,
  } = useContext(TodoContext);

  return (
    <div className="container mt-3">

     {/* Modal Open  button */}

    <div className="d-flex justify-content-between align-items-center">
  <h1 className="text-white">Todo App with Drag-and-Drop</h1>
  <button 
    type="button" 
    className="btn btn-primary" 
    onClick={() => setShowModal(true)}
  >
  <i class="bi bi-plus-circle"></i>  Add Todo
  </button>
</div>

    {/* Modal Show Component */}

      <TodoModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleSaveChanges={handleSaveChanges}
        title={title}
        setTitle={setTitle}
      />

{/* Drag and drop  */}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="titles" type="TITLE">
          {(provided) => (
            <div className="row mt-4" {...provided.droppableProps} ref={provided.innerRef}>
              {titles.map((item, index) => (
                <Draggable key={index} draggableId={`title-${index}`} index={index}>
                  {(provided) => (
                    <div
                      className="col-12 col-sm-6 col-md-3 mb-3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="card p-3 shadow-sm titcard">
                        <h5 className="text-center">{item.title}</h5>
                        <div className="d-flex justify-content-center mt-2">
                          <button className="btn text-white btn-sm me-2"
                          style={{backgroundColor:"#5710d9"}}
                          onClick={() => handleEdit(index)}>
                         <i className="bi bi-pencil-fill"></i>
                          </button>
                          <button className="btn text-white btn-sm" 
                          style={{backgroundColor:"#5710d9"}}
                          onClick={() => handleDelete(index)}>
                          <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>

                    {/* Subtitle component */}

                        <SubtitleCard titleIndex={index} item={item} />
                     
                      </div>

                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoHeader;
