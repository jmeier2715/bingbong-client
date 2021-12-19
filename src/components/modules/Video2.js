import React from 'react'
import { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Comment from './Comment'
import apiUrl from '../../apiConfig'

export default function Video2 (props) {

    const isValidUrl = (_string) => {
        const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
        return matchpattern.test(_string);
      }
      let allcomments
      if (props.comments != null) {
      allcomments = props.comments.map((comment)=>{
        //   console.log(comment)
          return (
              <ListGroupItem className="commentlist">
                  <small>{comment.username}</small>
                  <p>{comment.commentText}</p>
              </ListGroupItem>
          )
      })
    } else {
        <p>Please add a comment...</p>
    }

    //   console.log("is valid url", isValidUrl(props.url))
      // This works...don't touch :*(;
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
                      <Card.Title style={{fontFamily: "Work Sans"}}>{props.title}</Card.Title>
                    </Card.Body>
                    
                    
                    <ListGroup>{allcomments}</ListGroup>
                  </Card>   
                </div>
         
      : 
           <p>Loading...</p>
      
        
    )
 }

