import React, { useEffect, useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import MovieCard from './MovieCard'
import { Pagination } from '@mui/material'

function MoviePage({URL}) {
  const [data, setData] = useState([])
  const [totalPage, settotalPage] = useState(10)
  const [page, setPage] = useState(1)

  useEffect(() => {
    useAxios().get(`${URL}?language=en-US&page=${page}`).then(res => {
      setData(res.data.results.map(item => {
        item.isLiked = false,
        item.isSaved = false
        return item
      }));
      settotalPage(res.data.total_pages)
    })
  }, [page])

function handlePaginationChange(e, count){
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 300) 
  setPage(count)
}


  return (
    <>
    <div className='flex flex-wrap justify-between p-5 gap-[30px]'>
      {data.map(item => <MovieCard key={item.id} item={item} />)}
    </div>
    <div className='flex justify-center bg-[#000000eb] py-2'>
    <Pagination onChange={handlePaginationChange} count={totalPage} />
    </div>
    </>
  )
}

export default MoviePage
