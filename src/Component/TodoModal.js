import React, { useEffect, useRef } from "react";

const TodoModal = ({ showModal, handleClose, handleSaveChanges, title, setTitle, editingIndex }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // focus for inputfield modal displayed
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  return (
    <div className={`modal ${showModal ? "d-block" : "d-none"}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Todo Title</h5>
          
          </div>
          <div className="modal-body">
            <input
              ref={inputRef} 
              type="text"
              className="form-control"
              placeholder="Enter todo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
            <i class="bi bi-check2-circle"></i> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
