import React, { useState } from 'react';

export default function RecItem({ comment, updateComment, deleteComment, username }) {
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
    <ul role="list" className="divide-y divide-gray-100">
      <li key={comment._id} className="py-5">
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
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="mt-2 flex items-center">
              <button type="submit" className="text-sm text-blue-500 hover:underline cursor-pointer">
                Confirm Update
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-sm text-red-500 hover:underline cursor-pointer ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="comment-text-box p-7 rounded text-sm text-left">
            {comment.comment}
          </div>
        )}

        <div className="mt-2 flex items-center">
          <button
            onClick={handleUpdateClick}
            className="text-sm text-blue-500 hover:underline cursor-pointer pl-10"
          >
            Update
          </button>
          <button
            onClick={handleDeleteClick}
            className="text-sm text-red-500 hover:underline cursor-pointer pl-2"
          >
            Delete
          </button>
        </div>
        <div className="text-xs text-right text-gray-500 pr-5">
          by {username}
        </div>
      </li>
    
    </ul>
  );
}