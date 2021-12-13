import React from 'react'
import { useState, useEffect } from "react"

export default function Video() {
    const [video, setVideo] = useState (null)

    useEffect(()=>{
        getVideo()
    },[])
    //fetch request for videos by id
    let vidId = "61b77772d4613ef30293b412"
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
//     {
//     _id: new ObjectId("61b77772d4613ef30293b412"),
//     url: 'https://www.youtube.com/embed/Oe421EPjeBE',
//     externalUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
//     title: 'Node.js and Express.js - Full Course',
//     owner: new ObjectId("61b4e7e40bef58034e60c584"),
//     thumbnail: '',
//     duration: '',
//     categoryName: 'Express.js',
//     comments: [],
//     __v: 0
//   }
// const commentSchema = new mongoose.Schema(
//   {
//     postedBy: {
//       // to create a reference, the type should be Object
//       type: mongoose.Schema.Types.ObjectId,
//       // ref is also needed, so we can poulate the owner
//       ref: "User",
//       // Note: Populate means replacing the owner id with the person document...
//     },
//     commentText: {
//       type: String,
//       required: true,
//     },
//     thumbnail: String, // Maybe better to pull it from the owner
//   },
//   {
//     timestamps: true,
//   }
// )
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
