import React from "react";

const DynamicModal = ({
  showModal,
  closeModel,
  confirmAction,
  title = "Confirm Action",
  body = "Are you sure you want to proceed?",
  confirmButtonText = "Confirm",
}) => {
  return (
    showModal && (
      <div>
        <div>
          <div>
            <h3>{title}</h3>
            <button onClick={closeModel}>
              <span>&times;</span>
            </button>
          </div>
          <div>
            <p>{body}</p>
          </div>
          <div>
            <button onClick={confirmAction}>{confirmButtonText}</button>
          </div>
        </div>
      </div>
    )
  );
};

export default DynamicModal;
