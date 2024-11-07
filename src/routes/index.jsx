import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {NowPlaying, Popular, SingleMovie, TopRated, Upcoming} from '../pages'
import { PATH } from '../hooks/usePath'

function CustomRoutes() {
  return (
    <Routes>
        <Route path={PATH.home} element={<NowPlaying/>}/>
        <Route path={PATH.popular} element={<Popular/>}/>
        <Route path={PATH.topRated} element={<TopRated/>}/>
        <Route path={PATH.upcoming} element={<Upcoming/>}/>
        <Route path={PATH.singleMovie} element={<SingleMovie/>}/>
    </Routes>
  )
}

export default CustomRoutes