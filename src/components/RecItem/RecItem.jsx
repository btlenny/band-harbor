import React, { useState } from 'react';

export default function RecItem({ comment, updateComment, deleteComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.comment);

  const handleUpdateComment = (commentId, newText) => {
    updateComment(commentId, newText);
    setIsEditing(false);
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      handleDeleteComment(comment._id);
    }
  };

  return (
    <div key={comment._id} className="comment-container p-4 border rounded">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateComment(comment._id, editedText);
          }}
        >
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button type="submit">Confirm Update</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          {comment.comment}
          <div className="mt-2 text-right">
            <button
              onClick={handleUpdateClick}
              className="text-sm text-blue-500 hover:underline cursor-pointer"
            >
              Update
            </button>

            <button
              onClick={handleDeleteClick}
              className="text-sm text-red-500 hover:underline cursor-pointer ml-2"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}