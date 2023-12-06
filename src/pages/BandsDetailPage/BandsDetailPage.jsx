import React, { useEffect, useState } from 'react';
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from '../../utilities/comments-api';
import { getBandById } from '../../utilities/bands-api';
import { useParams, useNavigate } from 'react-router-dom';


const BandDetailPage = ({onCreateComment}) => {
  const navigate = useNavigate();
  const { bandId } = useParams();
  const [band, setBand] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBandDetails = async () => {
      try {
        const bandData = await getBandById(bandId);
        setBand(bandData);
        console.log('Fetched band details:', bandData);
      } catch (error) {
        console.error('Error fetching band details:', error);
      }
    };

    const fetchBandComments = async () => {
      try {
        const bandComments = await getAllComments(bandId);
        setComments(bandComments);
        console.log('Fetched band comments:', bandComments);
      } catch (error) {
        console.error('Error fetching band comments:', error);
      }
    };

    // Fetch band details and comments when the component mounts
    fetchBandDetails();
    fetchBandComments();
  }, [bandId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    console.log('bandId:', bandId);
    console.log('comment:', comment);
  
    const commentData = { comment };
  
    try {
      const response = await createComment(bandId, commentData);
  
      console.log('Raw Response:', response); // Log the raw response
  
      // Assuming the data is directly in response (replace 'data' with the correct property)
      if (response.success) {
        console.log('Comment added successfully:', response.data);
        onCreateComment(response.data);
        navigate(`/bands/${bandId}`);

      } else {
        console.error('Error adding comment. Server response:', response);
        alert('Error adding comment. Please try again.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment. Please try again.');
    }
  };

  const handleUpdateComment = async (commentId, newText) => {
    try {
      await updateComment(commentId, newText);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? { ...comment, text: newText } : comment
        )
      );
      alert('Comment updated successfully!');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Error updating comment. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
      alert('Comment deleted successfully!');
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Error deleting comment. Please try again.');
    }
  };

  const canEditOrDelete = (comment) => {
    // Replace 'user123' with the actual user ID or some authentication logic
    return comment.userId === 'user123';
  };

  if (!band) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{band.name}</h1>
      <p>{band.genre}</p>

      <form onSubmit={handleCommentSubmit}>
        <label>
          Add your recommendation:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button type="submit">Add Comment</button>
      </form>

      <div>
        <h2>Recommendations</h2>
        <ul>
        {comments.filter(comment => comment !== null).map((comment) => (

            <li key={comment._id}>
              {comment.text}{' '}
              {canEditOrDelete(comment) && (
                <>
                  <button
                    onClick={() => {
                      const newText = prompt('Enter new text:', comment.text);
                      if (newText !== null) {
                        handleUpdateComment(comment._id, newText);
                      }
                    }}
                  >
                    Update
                  </button>{' '}
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this comment?')) {
                        handleDeleteComment(comment._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BandDetailPage;
