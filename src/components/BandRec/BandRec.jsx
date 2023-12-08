import React from "react";
import RecItem from "../RecItem/RecItem";

export default function BandRec({
  comments,
  updateComment,
  deleteComment,
  currentuser
}) {
  return (
    <div className="">
      <h1 class="mb-4 font-bold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">User Recommendations</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {comments.map((comment) => (
          <RecItem
            key={comment._id}
            comment={comment}
            updateComment={updateComment}
            deleteComment={deleteComment}
            currentuser={currentuser}
            comments={comments}
          />
        ))}
      </ul>
    </div>
  );
}
