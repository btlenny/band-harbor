import React, { useEffect, useState } from 'react';
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from '../../utilities/comments-api';
import { getBandById } from '../../utilities/bands-api';
import { useParams, useNavigate } from 'react-router-dom';
import BandRec from '../../components/BandRec/BandRec';

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
  
  const handleUpdateComment = async (bandId, commentText, newText) => {
    try {
      console.log('Updating comment...');
      
      console.log('bandId:', bandId);
      console.log('commentText:', commentText); // Corrected variable name
      console.log('newText:', newText);
  
      const response = await updateComment(bandId, commentText, { text: newText }); // Corrected parameter
      console.log('Update Comment Response:', response);
  
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentText ? { ...comment, text: newText } : comment
        )
      );
  
      console.log('Comment updated successfully!');
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
  <div className="flex justify-between p-4">
    {/* Band Info Section */}
    <div className="flex items-center p-4">
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

    {/* Add Recommendation Form Section */}
    <form
      onSubmit={handleCommentSubmit}
      className="max-w-md w-full p-4 space-y-4 bg-sky-50 rounded-lg shadow-md"
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

      <div className="mt-6">
        <button
          type="submit"
          className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Recommendation
        </button>
      </div>
    </form>
    </div>

<BandRec comments={comments} updateComment={handleUpdateComment} deleteComment={handleDeleteComment}/>
{/* 
 */}

    </div>
  );
};

export default BandDetailPage;
