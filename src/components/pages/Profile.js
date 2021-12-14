import React from 'react'
import { useState, useEffect} from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default function Profile(props) {
     //states
    let userN = "61b71951505984e9ff9d54e4"
    const [profile, setProfile] = useState(null)

    //
    // if a page is state dependent it might think i dropped state and be like it doesn't exist
    // fetching data
    // useEffect( async ()=>{
    //     // getUserProfile()
    //     const response = await fetch(`http://localhost:8000/users/${userN}`)
    //     const data = await response.json()
    //     const { profile } = data
    //     setProfile(profile)
    //     console.table(data)
    //     console.table(profile)


    // },[])

    useEffect(() => {
        getUserProfile()
    },[])

    // component mounts, renders then makes the api call
    const getUserProfile = () => {
        fetch(`http://localhost:8000/users/${userN}`)
        .then(response => response.json())
        .then((foundUser) => {
            console.log("trying to render: ", foundUser)
            console.table(foundUser)
            setProfile(foundUser.profile) // <--- needs to be lowercase for me lmao
        })
        .catch(err => console.table(err))
    }

    return (
    <div>
        {profile !== null ?
        <div>

        <h1>UserName: {profile.username}</h1>
        <h1>OwnerId: {profile.owner}</h1>
        <h1>created: {profile.createdAt}</h1>
        <h1>updated: {profile.updatedAt}</h1>
        </div>
        :
        <div>
        Profile hasn't loaded...
        <Spinner animation="border" />
        </div>
        }
</div>
)
}
