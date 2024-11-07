import React, { useEffect, useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import { API_KEY, IMG_URL } from '../hooks/useEnv'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import YouTube from 'react-youtube'

function SingleMovie() {
  const {id} = useParams()
  const [changeImg, setChangeImg] = useState(false)

  const [movieInfo, setMovieInfo] = useState({})
  const [actors, setActors] = useState([])
  const [videos, setVideos] = useState([])

  useEffect(() => {
    useAxios().get(`/${id}?api_key=${API_KEY}`).then(res => {
      setMovieInfo(res.data)
    })
  }, [])
  
  useEffect(() => {
    useAxios().get(`/${id}/credits?api_key=${API_KEY}`).then(res => {
      setActors(res.data.cast)
    })
  }, [])

  useEffect(() => {
    useAxios().get(`/${id}/videos?api_key=${API_KEY}`).then(res => {
      setVideos(res.data.results.splice(0, 5))
    })
  }, [])
  console.log(videos)

  return (
    <div className='flex justify-between'>
      <div className='w-[25%] rounded-md p-5 border-[2px] border-white h-[90vh] overflow-y-auto space-y-3'>
        <h2 className='text-[25px] text-center text-white font-bold'>Actors</h2>
        {actors.map(item => (
          <div className='bg-[#000009] p-2 rounded-sm' key={item.id}>
            <img className='h-[350px] w-full object-cover rounded-md' src={`${IMG_URL}/${item.profile_path}`} />
            <h2 className='text-center text-white text-[20px] font-bold'>{item.character}</h2>
            <p className='text-center text-white text-[20px] font-semibold'>{item.name}</p>
          </div>
        ))}
      </div>
      <div className='w-[49%] rounded-md p-5 border-[2px] border-white h-[90vh]'>
        <h2 className='text-center text-white font-bold text-[25px] mb-5'>{movieInfo?.title}</h2>
          <div onMouseLeave={() => setChangeImg(false)} onMouseEnter={() => setChangeImg(true)}  className='h-[300px] relative flex overflow-hidden'>
            <img className={`h-full w-full absolute object-cover duration-300 border-[1px] border-slate-400 p-2 rounded-sm ${changeImg ? "left-[-120%]" : "left-0"}`} src={`${IMG_URL}/${movieInfo.poster_path}`} alt="" />
            <img className={`h-full w-full absolute object-cover duration-300 border-[1px] border-slate-400 p-2 rounded-sm ${changeImg ? "right-0" : "right-[-150%]"}`} src={`${IMG_URL}/${movieInfo.backdrop_path}`} alt="" />
          </div>
              <p className='text-[20px] text-white font-semibold mt-5'>{movieInfo.overview}</p>
              <p className='text-[20px] text-white mt-5'>Budget: {movieInfo.budget}$</p>
              <div className='flex items-center gap-3 mt-5'>
              {movieInfo?.genres?.map(item => <Button size='medium' key={item.id} variant='contained'>{item.name}</Button>)}
              </div>
      </div>
      <div className='w-[25%] space-y-3 rounded-md p-5 border-[2px] border-white h-[90vh] overflow-y-auto'>
        <h2 className='text-[25px] text-center text-white font-bold'>Trailers</h2>
        {videos.map(item => <YouTube className='w-full ' videoId={item.key} key={item.id}/>)}
      </div>
    </div>
  )
}

export default SingleMovie