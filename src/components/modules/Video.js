import React from 'react'
import { useState, useEffect } from "react"

export default function Video(props) {
    const [video, setVideo] = useState (null)
    // we will need to use, useParams in order to render detail pages....

    useEffect(()=>{
        getVideo()
    },[])
    //fetch request for videos by id
    let vidId = "61b8add7ba57f78173a24107"
    const getVideo = () => {
        fetch(`http://localhost:8000/videos/${vidId}`)
        .then(response=>{
            return response.json()
        })
        .then(foundVideos=>{
            console.log("anything?", foundVideos.Video)
            setVideo(foundVideos.Video)
        })
    }

// if (video.videos.title !== ""){
//     const comments = video.videos.comments.map((c, i)=>{
//         console.log(c.commentText)
//         return (
//             <li key={i}>
//                 {c.commentText}
//             </li>
//         )
//     })
//     return (
//       comments  
//     )
// }

    //return a video w/ a corresponding array of comments
    //return a title of the post (separate from the title of the video)
    // every src link needs to be an embed 
    return (
      <div>
        {video !== null ? 
         <iframe
            width="560"
            height="315"
            src={video.url}        
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>  
        :
         <p>Loading...</p>}
        {/* <ul>{comments}</ul> */}
        {/* stretch goal (implement a symbol for 'usefulness factor') */}
        {/* video title information located here/ length of video? */}
        {/* {videoembed} (not the component Video) */}

        {/* <comment/> */}
        {/* ^this will be a map of all the comments that belong to the specific video ID */}
      </div>
    )
}
