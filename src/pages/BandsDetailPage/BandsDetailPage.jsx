import React, { useEffect, useState } from 'react';
import {
  createComment,
  getCommentById,
  getAllComments,
  updateComment,
  deleteComment,
} from '../../utilities/comments-api';
import {getBandById} from '../../utilities/bands-api';
import { useParams } from 'react-router-dom';

const BandDetailPage = () => {
  const { bandId } = useParams();
  const [band, setBand] = useState(null);
  const [commentText, setCommentText] = useState('');
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
        const bandComments = await getCommentById(bandId);
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

    try {
      // Call the addComment function with the bandId and commentText
      await createComment(bandId, commentText);

      // After adding the comment, you may want to refetch the comments
      // or update the state directly without making an additional API call
      // Example:
      // setComments((prevComments) => [...prevComments, { text: commentText }]);
      setCommentText(''); // Clear the comment input field
      alert('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment. Please try again.');
    }
  };

  const handleUpdateComment = async (commentId, newText) => {
    try {
      await updateComment(commentId, newText);
      // Assuming the API call is successful, update the local state
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
      // Assuming the API call is successful, update the local state
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
      alert('Comment deleted successfully!');
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Error deleting comment. Please try again.');
    }
  };

  if (!band) {
    return <div>Loading...</div>; // You can show a loading indicator while fetching data
  }

  return (
    <div>
      <h1>{band.name}</h1>
      <p>{band.genre}</p>
      {/* Add more details as needed */}

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit}>
        <label>
          Add your recommendation:
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </label>
        <button type="submit">Add Comment</button>
      </form>

      {/* List of Comments */}
      <div>
        <h2>Recommendations</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              {comment.text}{' '}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BandDetailPage;