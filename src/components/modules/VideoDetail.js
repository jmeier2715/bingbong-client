import React, {useEffect, useState} from 'react'
import Link from 'react-router-dom'
import { useParams } from 'react-router'

export default function VideoDetail (props) {
    /* things we have that we will need in state */
    const [comments, setComments] = useState([])
    const { id } = useParams();
    console.log(useParams)
    console.log(props.id)
    // we will need to use, useParams in order to render detail pages....

    useEffect(()=>{
        getVideo()
    },[])

    const getAllComments = (props) => {
        // url pattern is /comments/:videoid/:commentid
        // url /comments/:videoid (for index of all comment attach to vide)
        fetch(`http://localhost:8000/comments/${props.id}`)
        .then(response=>{
            return response.json()
        })
        .then(foundVideos=>{
            console.log("anything?", foundVideos.Video)
            setVideo(foundVideos.Video)
        })
    }
    //fetch request for videos by id

    return (
        <div>
          <h1>Video Detail</h1>
          <small>{props.articles[id].title}</small>
        </div>
      );
    }
