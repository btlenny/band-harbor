import React, { useEffect, useState } from 'react';
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from '../../utilities/comments-api';
import { getBandById } from '../../utilities/bands-api';
import { useParams, useNavigate } from 'react-router-dom';

const BandDetailPage = ({ onCreateComment }) => {
  const navigate = useNavigate();
  const { bandId } = useParams();
  const [band, setBand] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBandDetailsAndComments = async () => {
      try {
        const bandData = await getBandById(bandId);
        setBand(bandData);
        console.log('Fetched band details:', bandData);

        const bandComments = await getAllComments(bandId);
        setComments(bandComments);
        console.log('Fetched band comments:', bandComments);
      } catch (error) {
        console.error('Error fetching band details or comments:', error);
      }
    };

    // Fetch band details and comments when the component mounts
    if (!bandId || !band) {
      fetchBandDetailsAndComments();
    }
  }, [bandId, band]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    console.log('bandId:', bandId);
    console.log('comment:', comment);

    const commentData = { comment };

    try {
      const response = await createComment(bandId, commentData);

      console.log('Full Response:', response); // Log the raw response

      setComments(() => [
        ...comments,
        { id: comments.length + 1, text: comment },
      ]);

      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment. Please try again.');
    }
  };

  const handleUpdateComment = async (bandId, commentId, newText) => {
      try {
          await updateComment(bandId, commentId, { text: newText });
          setComments((prevComments) =>
              prevComments.map((comment) =>
                  comment._id === commentId ? { ...comment, text: newText } : comment
              )
          );
          alert('Comment updated successfully!');
      } catch (error) {
          console.error('Error updating comment:', error.response ? error.response.data : error);
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

  if (!band) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center pt-8">
      <div className="flex items-center justify-center">
        <img
          className="h-48 w-48 mr-4 object-cover"
          src={band.photoUrl}
          alt={`${band.name} Cover`}
        />
        <div>
          <h1 className="text-2xl font-bold">{band.name}</h1>
          <p>{band.album}</p>
        </div>
      </div>
      <br></br>
      <form
        onSubmit={handleCommentSubmit}
        className="max-w-sm mx-auto p-4 space-y-4 bg-sky-50 rounded-lg shadow-md"
      >
        <div className="border-b border-gray-900/10 pb-8">
          <div className="mt-6">
            <div className="mt-2">
              <input
                type="text"
                id="comment"
                name="comment"
                autoComplete="off"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="block w-full h-16 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
              />
            </div>
          </div>
        </div>

        {/* If you want to add more fields, you can follow a similar structure */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Recommendation
          </button>
        </div>
      </form>
      <div>
        <br />
        <h2>Recommendations</h2>
        <div className="grid grid-cols-2 gap-4">
          {console.log('Comments:', comments)}
          {comments.map((comment) => (
            <div key={comment._id} className="comment-container p-4 border rounded">
              {comment.comment}
              <div className="mt-2 text-right">
      <button
        onClick={() => {
          const newText = prompt('Enter new text:', comment.text);
          if (newText !== null) {
            handleUpdateComment(comment._id, newText); // Pass comment._id here
          }
        }}
        className="text-sm text-blue-500 hover:underline cursor-pointer"
      >
        Update
      </button>
      <button
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this comment?')) {
            handleDeleteComment(comment._id); // Pass comment._id here
          }
        }}
        className="text-sm text-red-500 hover:underline cursor-pointer ml-2"
      >
        Delete
      </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BandDetailPage;
