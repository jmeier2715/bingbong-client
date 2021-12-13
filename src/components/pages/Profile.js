import React from 'react'
import Header from '../shared/Header'
import { useState, useEffect} from 'react'



export default function Profile(props) {
     //states
    let userN = "61b71951505984e9ff9d54e4"
    const [profile, setProfile] = useState ({
            username: "",
            comments: [],
            videos: [],
            followers:[],
            following:[]
    })

    // fetching data
    useEffect(()=>{
        getUserProfile()
    },[])


    const getUserProfile = () => {
        fetch(`http://localhost:8000/users/${userN}`)
        .then(response => response.json())
        .then((foundUser) => {
            console.log("trying to render: ", foundUser)
            console.table(foundUser)
            setProfile(foundUser)
        })
        .catch(err => console.table(err))
    }



    // console.log(profile)

    //methods
    //function that populates array from profile schema
    //function that deletes an object from the array and updates state

    //clickhandlers and other odds and ends 
    // DISPLAY METHODS
    // const userProfile = profile.map()
    console.log(profile.username)

    return (
       
        <div>
            <h1>{profile.Profile.username}</h1>
            {/* {userProfile} */}
            {/* {<header/>} */}
            {/* <Videos/> */}
            {/* ^This will contain a map of videos you've posted by id*/}

            {/* {<comments/>} */}
            {/* ^this will contain a map of comments you've posted by id */}

            {/* <Followers/> */}
            {/* ^this will return a map of users that follow you */}
            {/* ^also return a count of followers */}

            {/* <Following/> */}
            {/* ^this will return a map of users that you follow */}
            {/* ^also return a count of users you follow*/}

            {/* <useful videos (maybe some kind of symbol)/> */}
            {/* ^this will return a map of videos you've marked as useful */}
        </div>
    )
}
