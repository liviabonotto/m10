import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import CompareChanges from '../../presentation/pages/project/components/compare/compareChanges'
import Home from '../../presentation/pages/home/home'
import Project from '../../presentation/pages/project/project'

const Router: React.FC = () => {
  return (
    <HashRouter >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project' element={<Project />} />
        <Route path='/compareChanges' element={<CompareChanges />} />
      </Routes>
    </HashRouter >
  )
}

export default Router
