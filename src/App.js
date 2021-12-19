// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import apiUrl from './apiConfig'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/pages/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Profile from './components/pages/Profile'
import AddVideo from './components/modules/AddVideo'
import Comment from './components/modules/Comment'
import EditVideo from './components/modules/EditVideo'




const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  const [curProfile, setCurProfile] = useState([])
  const [allVideos, setAllVideos] = useState(null)
  const [allComments, setAllComments] = useState(null)
  const [updateToggle, setUpdateToggle] = useState(false)





useEffect(() => {
  getAllVideos()
  getAllProfile()
  getAllComments()
}, [user])


const getAllComments = () => {
  fetch(`${apiUrl}/videos/`)
  .then(response => {
    return response.json()
  })
  .then(foundComments => {
    console.log("these are comments??? WHERE THIS: ", foundComments)
    setAllComments(foundComments.comment)
  })
  .catch(error => console.log(error))
}



console.log('this is user', user)

const getAllVideos = () => {
      fetch(`${apiUrl}/videos/`)
      .then(response => {
          return response.json()
      })
      .then(foundVideos => {
          console.log("anything?", foundVideos.videos)
          setAllVideos(foundVideos.videos)
    // console.log("this is allVideos", allVideos)
  })
  .catch((error) => { 
    console.log(error) })
  }

const getAllProfile = () => {
  if (user !== null) {
    fetch(`${apiUrl}/users/`)
    .then(response => response.json())
    .then((foundUserResponse) => {
      console.log("trying to render: ", foundUserResponse)
      let foundUser = foundUserResponse.profile.filter((cUser)=>{
        return user._id === cUser.owner })
      if (foundUser === null) {
        setCurProfile(null)
      }
      console.log("this would be the matching user..", foundUser)
      setCurProfile(foundUser) 
    }) // this promise is failing and i don't know why lmao...
    .catch(err => console.log(err))
    // more unexpected behavior...now the token seems to work but I get a duplicate key error for the schema...which is unfortunate.
  }
}


  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}
  //upon sign in we should "pass down profile info with the user" as a prop to any component we want
  // we refactor 
  // 



		return (
      <Fragment>
        <Header user={user} />
        <Routes>
          <Route
            path="/"
            element={
            <Home msgAlert={msgAlert}
                  user={user} 
                  curProfile={curProfile} 
                  allVideos={allVideos}/>}
                  refreshVideos={getAllVideos}
                />
          <Route
            path="/sign-up"
            element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
          />
          <Route
            path="/sign-in"
            element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
          />
          <Route
            path="/sign-out"
            element={
              <RequireAuth user={user}>
                <SignOut
                  msgAlert={msgAlert}
                  clearUser={clearUser}
                  user={user}
                />
              </RequireAuth>
            }
          />
          <Route
            path="my-profile"
            element={
              <RequireAuth user={user}>
                <Profile
                  getAllVideos={getAllVideos}
                  allVideos={allVideos}
                  getAllProfile={getAllProfile}
                  curProfile={curProfile}
                  user={user}
                  allComments={allComments}
                  getAllComments={getAllComments}
                />
              </RequireAuth>
            }
          />
           <Route path="/edit/:id" element={<EditVideo allVideos={allVideos}/> } />
          <Route
            path="post-new-video"
            element={
              <RequireAuth user={user}>
                <AddVideo
                  refreshVideos={getAllVideos}
                  getAllProfile={getAllProfile}
                  curProfile={curProfile}
                  user={user}
                />
              </RequireAuth>
            }
          />

          <Route
            path="/change-password"
            element={
              <RequireAuth user={user}>
                <ChangePassword msgAlert={msgAlert} user={user} />
              </RequireAuth>
            }
          />
        </Routes>
        {/* <Video /> */}
        {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={deleteAlert}
          />
        ))}
      </Fragment>
    )
}

export default App
