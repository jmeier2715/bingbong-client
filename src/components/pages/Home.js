import { useState, useEffect } from 'react'
import Video2 from '../modules/Video2'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	// retrieving all videos
	const [allVideos, setAllVideos] = useState(null)

	useEffect(()=> {
		getAllVideos()
	}, [])

	const getAllVideos = () => {
        fetch(`http://localhost:8000/videos/`)
        .then(response=>{
            return response.json()
        })
        .then(foundVideos=>{
            console.log("anything?", foundVideos.videos)
            setAllVideos(foundVideos.videos)
			console.log("this is allVideos", allVideos)
		})
		.catch((error)=>{ 
			console.log(error) })
    }

	let allFoundVideos
	if (allVideos !== null) {
	allFoundVideos = allVideos.map((video, key)=> {
		console.log(video)
		return <li><Video2 index={key} url={video.url}/></li>
	})}


	return (
		<div>
		{allVideos === null ? 
			null :
			<ul>
				{allFoundVideos}
			</ul>
		}
		</div>
	)
}

export default Home
