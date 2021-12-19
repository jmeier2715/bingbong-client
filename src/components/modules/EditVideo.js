import React from 'react'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import apiUrl from '../../apiConfig'


export default function EditVideo(props) {
    const { id }  = useParams();
    console.log(useParams())

    let userVideo = props.allVideos.filter((uVideos) => {
        return uVideos._id === id
    })
    console.log("uservideo", userVideo[0]._id)
    console.log("idparam", id)


    const [form, setForm] = useState({
        title: userVideo[0].title,
        categoryName: userVideo[0].categoryName
    })

    const editVideoForm = (e) => {
        e.preventDefault()
        let preJSONBody = {
            title: form.title,
            categoryName: form.categoryName
        }
        console.log("this PJB", preJSONBody)
        fetch(`${apiUrl}/videos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(preJSONBody),
            headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${props.user.token}`
        }
        })
            .then(response=>response.json())
            .then(editedVideo=>{
                // get all videos again 
                props.getAllVideos()
                setForm({
                title: '',
                categoryName: ''
                }) 
            })
            .catch(err=>console.error)
        }

            
    const handleVideoInputChange = (e) =>{
        setForm({ ...form, [e.target.name]: e.target.value })
        // this is to see change and update current input value and assign it to NewVideo
}



    // console.log("this is editvideo", props.allVideos)

    console.log(props)



    // console.log(userVideo)

    return (
        <div>
            <form onSubmit={editVideoForm}>
            <label htmlFor="title"> Title: </label>
            <input type="text" name="title" id="title" value={form.title} onChange={handleVideoInputChange}/>
            <label htmlFor="categoryName"> Category: </label>
            <input type="text" name="categoryName" id="categoryName" value={form.categoryName} onChange={handleVideoInputChange}/>
            <input type="submit" value="Submit" />

            </form>
        </div>
    )
}
