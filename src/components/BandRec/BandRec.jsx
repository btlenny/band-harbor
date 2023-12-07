import React from 'react'
import RecItem from '../RecItem/RecItem'

export default function BandRec({comments, updateComment, deleteComment}) {
  return (
    <div>
    <br />
    <h2>Recommendations</h2>
    <div className="grid grid-cols-2 gap-4">
      {console.log('Comments:', comments)}
      {comments.map((comment) => (
        <RecItem
          key={comment._id}
          comment={comment}
          updateComment={updateComment}
            deleteComment={deleteComment}
          // Pass the handleUpdateComment and handleDeleteComment functions here
        />
      ))}
    </div>
  </div>
  )
}
