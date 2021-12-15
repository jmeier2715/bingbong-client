import React from 'react'
import { useState, useEffect } from "react"

export default function Video2 (props) {
    console.log("these are the props in video2", props)

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
              <div>
              <p>{comment.postedBy}</p>
              <p>{comment.commentText}</p>
              </div>
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
                    <iframe
                        width="560"
                        height="315"
                        src={props.url}        
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        ></iframe>
                    <button>Join the Discussion</button>
                    {allcomments}
                    </div>  
                    :
                    <p>Loading...</p>}
                </div>
          )
      } else {
          return(
              <div>Invalid link...</div>
          )
      }

}
