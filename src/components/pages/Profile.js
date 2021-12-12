import React from 'react'



export default function Profile() {
     //states
          const [profile, setProfile] = useState ({
            comments: [],
            videos: [],
            followers:[],
            following:[]
    })
    //methods
    //function that populates array from profile schema
    //function that deletes an object from the array and updates state

    //clickhandlers and other odds and ends 

    return (
       
        <div>
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
