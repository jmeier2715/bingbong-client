import React from 'react'
import { useState, useEffect} from 'react'
import App from '../../App'
import uuid from 'uuid'
import apiUrl from '../../apiConfig'

export default function Profile(props) {
    console.log(props)
// `use strict`;
     //states
    const [profile, setProfile] = useState(null)
    const [edit, setEdit] = useState(false)
    const [createProfile, setCreateProfile] = useState({
        username: '',
        owner: props.user._id
    })
    const [editVideo, setEditVideo] = useState({
        title: '',
        categoryName: '',
    })
    const [editFormDisplay, setEditFormDisplay] = useState(false)

    const editFormToggle = (e) => {
        editFormDisplay ? setEditFormDisplay(false) : setEditFormDisplay(true)
    }

    useEffect(()=>{
        props.getAllProfile()
        console.log("did props reset down here?" , props.curProfile)
        console.log(props.curProfile.length)
    }, [])


    const handleInputChange = (e) => {
        setCreateProfile({...createProfile, [e.target.name]: e.target.value})
    }



    const deleteVideo = (e) => {
        e.preventDefault()
        fetch(`${apiUrl}/videos/${e.target.id}`, {
            method: "DELETE",
                headers: {
                           "Content-Type": "application/json",
                           "Authorization": `Bearer ${props.user.token}`
                         },
            })
            .then(() => props.getAllVideos()) 
            .catch(error => console.error())
        // console.log("delete Video target", e.target.value
        }

    const deleteComment = (e) => {
        e.preventDefault()
        fetch(`${apiUrl}/comments/${e.target.id}`, {
            method: "DELETE",
                headers: {
                           "Content-Type": "application/json",
                           "Authorization": `Bearer ${props.user.token}`
                         },
            })
            .then(() => props.getAllComments())
            .catch(error => console.error)
    }

    
    let userComments = props.allVideos.map((uCom)=>{

        let filterFilter = uCom.comments.filter((uCom)=>{
            console.log(uCom)
        // const obj = uCom
        // const {0} = obj
        // console.log(obj)
        return props.user.email === uCom.username
        })
        console.log("this is usercom:", filterFilter)
        return filterFilter
    })

    // db.comments.deleteOne({uuid: req.body.uuid})


      let userComMap = userComments.map((comment) => {
        return comment.map((text) => {
          return (
            <div>
              {text.commentText}
              <form id={text._id} onSubmit={deleteComment}>
                <button type="submit" value="Submit">
                  Delete
                </button>
              </form>
            </div>
          )
        })
      })


    console.log('props in profile', props)
    const handleSubmit = (e) => {
        e.preventDefault() 
        // let jsonPayload = {
        //     username: createProfile.username,
        //     owner: createProfile.owner
        // }
        console.log(typeof(jsonPayload))
        fetch(`${apiUrl}/users`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.user.token}`
            },
            body: JSON.stringify({
                profile: {
                username: createProfile.username,
                owner: createProfile.owner
                }
            })

        })
        .then(()=>{
            setCreateProfile({
                username: '',
                owner: props.user._id
            })
            props.getAllProfile()
        }) 
        .catch((error)=>{
            console.log("oh..you fucked up lmao", error)
        })
    }



    let userVideos = props.allVideos.filter((uVideo)=>{
        return props.user._id === uVideo.owner })
        console.log( 'user videos', userVideos)
    
    
    const handleVideoInputChange = (e) =>{
            setEditVideo({ ...editVideo, [e.target.name]: e.target.value })
            // this is to see change and update current input value and assign it to NewVideo
    }

    const editVideoForm = (e) => {
    e.preventDefault()
    let preJSONBody = {
        title: '',
        categoryName: ''
    }
    fetch(`${apiUrl}/videos/${e.target.id}`, {
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
            setEditVideo({
            title: '',
            categoryName: ''
            }) 
        })
        .catch(err=>console.error)
    }






    

    let userMap = userVideos.map((video)=>{
        return ( 
                        <div>
                        {video.title}
                        <form 
                            id= {video._id}
                            onSubmit= {deleteVideo}>
                                <button
                                    type= "submit"
                                    value= "Submit"
                                    >
                                    Delete
                                </button>
                            </form>
                            <button onClick={editFormToggle}> Edit </button>
                        </div>
)})
                    

			
    let renderform

    if (props.curProfile.length === 0) {
        // if there is no curprofile && edit is false then there must not be a profile at all

        const errmsg = "The number should be 0"
            console.assert(props.curProfile.length === 0, {length: props.curProfile.length, errmsg: errmsg})
            console.log("this is length before htiting the decision tree:", props.curProfile.length)
            return renderform = (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Set Your Username: </label>
                        <input type="text" name="username" id="username" onChange={handleInputChange} value={createProfile.username} />
                        <input type="submit" value="Submit" />
                    </form>

                </div>
            )
        } else if (props.curProfile.length === 1 && edit === true) {
            // if there is a curprof and edit is true then edit
            return renderform = (
                <div>
                    Want to edit...
                    
                </div>
            )
        } else if (props.curProfile.length === 1 && edit === false) {
            // if there is a curprof and edit is false then they just want display...
            console.log("This is username:", props.curProfile[0].username)
            return renderform = (
                <div>
                    Current UserName: 
                    <h1>{props.curProfile[0].username}</h1>
                    {userMap}
                    {userComMap}

                </div>
            )
        } else {
            const errmsg = "The number should be 1"
            const errmsg2 = "The number should be false"
            console.assert(props.curProfile.length === 1, {length: props.curProfile.length, errmsg: errmsg})
            console.assert(edit === false, {edit: edit, errmsg: errmsg2})
            return null
        }        

}