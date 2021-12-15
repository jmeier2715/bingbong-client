import React from 'react'

function Comment() {
    const [newComment, setNewComment] = useState({
        postedBy: "",
        commentText: "",
        thumbnail: ""
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
    fetch(`http://localhost:8000/comments/${videoId}`,{
        method: 'POST',
        body: JSON.stringify(preJSONBody)
    })
    .then(response => response.json())
    .then(postedComment =>{
        props.refreshComments()
        setNewComment({
            postedBy: "",
        commentText: "",
        thumbnail: ""
        })

    })
}
    // let user import comments from schema (findBy: video id) using a populate method
    // *** must alter the comment route/model***

    

    return (
        <div>
            {/* some kind of input box to leave a new comment*/}
            {/* {Comment} */}
            {/* some kind of delete comment button (bc racism, sexism) */}

            {/* ^this will show all the comments belonging to the given profile/video id */}
        </div>
    )
}
// export default Comment