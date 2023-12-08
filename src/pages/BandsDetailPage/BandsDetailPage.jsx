import React, { useEffect, useState } from "react";
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from "../../utilities/comments-api";
import { getBandById } from "../../utilities/bands-api";
import { useParams, useNavigate } from "react-router-dom";
import BandRec from "../../components/BandRec/BandRec";

const BandDetailPage = ({ currentuser }) => {
  const { bandId } = useParams();
  const [band, setBand] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentAdded, setCommentAdded] = useState(false);
  useEffect(() => {
    const fetchBandDetailsAndComments = async () => {
      try {
        const bandData = await getBandById(bandId);
        setBand(bandData);
        const bandComments = await getAllComments(bandId);
        setComments(bandComments);
      } catch (error) {
        console.error("Error fetching band details or comments:", error);
      }
    };
    fetchBandDetailsAndComments();
  }, [bandId, commentAdded]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = { comment };
    try {
      const response = await createComment(bandId, commentData);
      setComments((prevComments) => [
        ...prevComments,
        { id: prevComments.length + 1, text: comment },
      ]);
      setCommentAdded((prev) => !prev); // Toggle the dummy state
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment. Please try again.");
    }
  };

  const handleUpdateComment = async (commentId, newText) => {
    try {
      const response = await updateComment(commentId, { text: newText }); // Corrected parameter
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? { ...comment, comment: newText } : comment
        )
      );
    } catch (error) {
      console.error(
        "Error updating comment:",
        error.response ? error.response.data : error
      );
      alert("Error updating comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Error deleting comment. Please try again.");
    }
  };
  if (!band) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center pt-8">
      <div className="flex justify-between p-4">
        {/* Band Info Section */}
        <div className="mx-auto p-4">
          <img
            className="h-48 sm:h-64 md:h-80 lg:h-96 w-full object-cover"
            src={band.photoUrl}
            alt={`${band.name} Cover`}
          />
          <div>
            <h1 className="text-2xl font-bold mb-2">{band.name}</h1>
            <p className="mb-4">{band.album}</p>
          </div>
        </div>
        <div className="mx-auto p-10 w-3/4 flex justify-center items-center">
          <form
            onSubmit={handleCommentSubmit}
            className="w-full max-w-xl p-4 space-y-4"
          >
            <div className="flex items-center border-b border-gray-200 py-2">
              <input
                type="text"
                id="comment"
                name="comment"
                autoComplete="off"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="appearance-none bg-transparent border-none w-full h-12 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Share your recs here"
                aria-label="Full name"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-sky-500 hover:bg-indigo-500 border-sky-500 hover:border-indigo-500 text-sm border-4 text-white py-1 px-2 rounded"
              >
                Add Recommendation
              </button>
            </div>
          </form>
        </div>
      </div>
      <BandRec
        comments={comments}
        updateComment={handleUpdateComment}
        deleteComment={handleDeleteComment}
        currentuser={currentuser}
      />
    </div>
  );
};

export default BandDetailPage;
