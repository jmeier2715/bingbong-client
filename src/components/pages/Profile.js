import React from 'react'
import { useState, useEffect} from 'react'
export default function Profile(props) {
// `use strict`;
     //states
    const [profile, setProfile] = useState(null)
    const [edit, setEdit] = useState(false)
    const [createProfile, setCreateProfile] = useState({
        username: '',
        owner: props.user._id
    })



    useEffect(()=>{
        // props.getAllProfile()
        console.log("did props reset down here?" , props.curProfile)
        console.log(props.curProfile.length)
    }, [])


    const handleInputChange = (e) => {
        setCreateProfile({...createProfile, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault() 
        let jsonPayload = {
            username: createProfile.username,
            owner: createProfile.owner
        }
        console.log(typeof(jsonPayload))
        fetch('http://localhost:8000/users/',
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(jsonPayload)

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

    let renderform

    if (props.curProfile.length === 0) {
        // if there is no curprofile && edit is false then there must not be a profile at all

        const errmsg = "The number should be 0"
            console.assert(props.curProfile.length === 0, {length: props.curProfile.length, errmsg: errmsg})
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
                    <button> Edit </button>
                </div>
            )
        } else if (props.curProfile.length === 1 && edit === false) {
            // if there is a curprof and edit is false then they just want display...
            return renderform = (
                <div>
                    <h1>{props.curProfile.username}</h1>
                    <h1>{props.curProfile.username}</h1>
                    <h1>{props.curProfile.username}</h1>
                </div>
            )
        } else {
            return null
        }        
}
    









    // component mounts, renders then makes the api call
    // let render
    // if ()

    // if there is no profile...render a create profile form...
    // else ( if there is a profile but user wants to change something...render edit form, this means that there would need to be a state determining whether or not the form is "edit" or display) else...render edit form...
    // else



//     return (
//     <div>
//         {profile !== null ?
//         <div>

//         <h1>UserName: {profile.username}</h1>
//         <h1>OwnerId: {profile.owner}</h1>
//         <h1>created: {profile.createdAt}</h1>
//         <h1>updated: {profile.updatedAt}</h1>
//         </div>
//         :
//         <div>
//         Profile hasn't loaded...
//         <Spinner animation="border" />
//         </div>
//         }
// </div>
// )
