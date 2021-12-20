import { useState, useEffect } from 'react'
import Video2 from '../modules/Video2'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Comment from '../modules/Comment'
import uuid from 'uuid'
import apiUrl from '../../apiConfig'
import Container from 'react-bootstrap/Container'


const Home = (props) => {
	// const { msgAlert, user } = props
	// console.log('props in home', props)

	let allFoundVideos
	if (props.allVideos !== null) {
		allFoundVideos = props.allVideos.map((video, key)=> {
			// console.log("this is video id", video._id)
			// console.log('this is user', props.curProfile)
			return (
				<Container className="contentwrapper">
					<div className="videowrapper">
						<Video2 index={key} url={video.url} comments={video.comments} title={video.title}
					curProfile={props.curProfile} videoId={video._id} user={props.user} />
					</div>
					<div className="submitcomment">
						<Comment className="my-1" curProfile={props.curProfile} videoId={video._id} userId={props.user}/>
					</div>
				</Container>
				)
	})}


	return (
		<Container>
			{props.allVideos === null ? 
				null :
				<Row xs={1} md={1} className="g-4">
					{allFoundVideos}
				</Row>
			}
		</Container>
	)
}

export default Home
