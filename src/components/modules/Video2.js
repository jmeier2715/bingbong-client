import React from 'react'
import { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Comment from './Comment'

export default function Video2 (props) {
    const [newComment, setNewComment] = useState({
      postedBy: props.username,
      commentText: "",
      thumbnail: "",
    })

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
    }
        const handleCommentInputChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value })
    // this is to see change and update current input value and assign it to NewVideo
    }
    // console.log("these are the props in video2", props)

    // regex filter to allow us to determine what to display depending on true or false result!
    // so we need to write a condition that uses isValidUrl to return the video if it is valid, but return nothing if it is not valid...
    const isValidUrl = (_string) => {
        const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
        return matchpattern.test(_string);
      }
      let allcomments
      if (props.comments != null) {
      allcomments = props.comments.map((comment)=>{
        //   console.log(comment)
          return (
              <ListGroupItem>
                  <small>{comment.postedBy}</small>
                  <p>{comment.commentText}</p>
              </ListGroupItem>
          )
      })
    } else {
        <p>Please add a comment...</p>
    }

    //   console.log("is valid url", isValidUrl(props.url))
      // This works...don't touch :*(
      console.log("these are the props", props);
    const {url} = props
      return (
        isValidUrl(url)  ? 
                <div>
                  <Card className="container">
                    <iframe
                      width="560"
                      height="315"
                      src={props.url}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <Card.Body>
                      <Card.Title>{props.title}</Card.Title>
                    </Card.Body>
                     <form onSubmit={postComment}>
                        <div>
                        <label htmlFor="comment">Type a comment:</label>
                        <input
                            type="text"
                            name="comment"
                            id="comment"
                            onChange={handleCommentInputChange}
                            value={newComment.commentText}
                        />
                        </div>
                        <input type="submit" value="Submit"/>
                    </form>
                    <ListGroup>{allcomments}</ListGroup>
                  </Card>
                  
                </div>
         
      : 
           <p>Loading...</p>
      
        
    )
 }

