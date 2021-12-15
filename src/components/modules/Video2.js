import React from 'react'
import { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export default function Video2 (props) {
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
      if (isValidUrl(props.url) === true) {
          return(
              <div>
                {props.url !== null ? 
                    <div>
                    {/* <Col> */}
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
                        <Button variant="primary" size="sm">Join the Discussion</Button>
                        <ListGroup>
                        {allcomments}
                        </ListGroup>
                        </Card>
                    {/* </Col> */}
            
                    </div>  
                    :
                    <p>Loading...</p>}
                </div>
          )
      } else {
          return(
              null
          )
      }

}
