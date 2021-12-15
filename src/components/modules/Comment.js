import React, { useEffect, useState } from 'react'


export default function Comment(props) {
    const [newComment, setNewComment] = useState({
        postedBy: props.username,
        commentText: "",
        thumbnail: "",
        })



//function to bring all comments belonging to a video
//function to post a comment 
const postComment = (e) => {
    e.preventDefault()
    let preJSONBody = {
        postedBy: newComment.postedBy,
        commentText: newComment.commentText,
        thumbnail: newComment.thumbnail
    }
    fetch(`http://localhost:8000/comments/${props.videoId}`, {
      method: "POST",
      body: JSON.stringify(preJSONBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      }
        .then((response) => response.json())
        .then((postedComment) => {
          setNewComment({
            postedBy: props.username,
            commentText: "",
            thumbnail: "",
          })
        })
        .catch((err) => console.error()),
    })

const handleInputChange = (e) => {
  setNewComment({ ...newComment, [e.target.name]: e.target.value })
  // this is to see change and update current input value and assign it to NewVideo
}
    // let user import comments from schema (findBy: video id) using a populate method
    // *** must alter the comment route/model***

    

    return (
      <form onSubmit={postComment}>
        <div>
          <label htmlFor="comment">Type a comment:</label>
          <input
            type="text"
            name="comment"
            id="comment"
            onChange={handleInputChange}
            value={newComment.commentText}
          />
        </div>
        <input type="submit" value="Submit"/>
      </form>
    )    
}
}
