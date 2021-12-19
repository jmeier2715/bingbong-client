import React from 'react'
import { useParams } from 'react-router-dom'

export default function EditVideo(props) {

    const { id }  = useParams();
    console.log(useParams())
    console.log("this is editvideo", props)


    return (
        <div>
            <form>
                <h1>{props.allVideos[0].title}</h1>
            <label htmlFor="title"> Title: </label>
            <input type="text" name="title" id="title"/>
            <input type="submit" value="Submit" />

            </form>
        </div>
    )
}
