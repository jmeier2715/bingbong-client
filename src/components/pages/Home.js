import { useState, useEffect } from 'react'
import Video2 from '../modules/Video2'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	// retrieving all videos
	const [allVideos, setAllVideos] = useState(null)

	useEffect(() => {
		getAllVideos()
	}, [])

	const getAllVideos = () => {
        fetch(`http://localhost:8000/videos/`)
        .then(response=>{
            return response.json()
        })
        .then(foundVideos=>{
            // console.log("anything?", foundVideos.videos)
            setAllVideos(foundVideos.videos)
			// console.log("this is allVideos", allVideos)
		})
		.catch((error)=>{ 
			console.log(error) })
    }

	let allFoundVideos
	if (allVideos !== null) {
	allFoundVideos = allVideos.map((video, key)=> {
		// console.log(video)
		return (<Video2 index={key} url={video.url} comments={video.comments} title={video.title}/>)
	})}


	return (
		<div>
		{allVideos === null ? 
			null :
			<Row xs={1} md={1} className="g-4">
				{allFoundVideos}
			</Row>
		}
		</div>
	)
}

export default Home
