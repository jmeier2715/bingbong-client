import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import apiUrl from '../../apiConfig';


export default function Comment(props) {
  const [newComment, setNewComment] = useState({   
          "postedBy":props.userId,
          // "username":props.userId.email,  
          "commentText": "",
          "thumbnail": ""
      })

  const handleCommentInputChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value })
    // this is to see change and update current input value and assign it to NewVideo
    }

    console.log('comment props', props)

  //function to post a comment 
  const postComment = (e) => {
      e.preventDefault()
      console.log ('this is video id', props.videoId)
      // console.log('this is userid', props)
      console.log('this is commenttext', newComment)
      let uuidhack
      uuidhack = uuid();
      console.log("this is uuidhack", uuidhack)
      let preJSONBody = {
          postedBy: props.userId,
          username: props.userId.email,  
          commentText: newComment.commentText,
          thumbnail: newComment.thumbnail,
      }
      fetch(`${apiUrl}/comments/${props.videoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.userId.token}`
                },
        body: JSON.stringify(preJSONBody)
      
    })
          .then(response => response.json())
          .then(postedComment => {
            setNewComment({
                postedBy: props.userId,
                // username: props.userId.email,
                commentText: "",
                thumbnail: "",
              })
            })
            .catch(err=>console.error)
    }
    // let user import comments from schema (findBy: video id) using a populate method
    // *** must alter the comment route/model***

    

    return (
      <form className="commentsubmit" onSubmit={postComment}>
          <div>
          <input
              type="text"
              name="commentText"
              id="comment"
              onChange={handleCommentInputChange}
              value={newComment.commentText} placeholder="add a comment..."
          />
          
          </div>
          <input type="submit" value="Submit"/>
      </form>
    )    
}

