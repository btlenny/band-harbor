import React from 'react'
import RecItem from '../RecItem/RecItem'

export default function BandRec({comments, updateComment, deleteComment, username}) {
  return (
    <div className=" bg-gray-50">
   
  
    <ul role="list" className="divide-y divide-gray-200">

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
    </ul>
  </div>
  )
}
