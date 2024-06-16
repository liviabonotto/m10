/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/react-in-jsx-scope */
import '../presentation/styles/global.scss'

import { createRoot } from 'react-dom/client'
import Router from './routes/router'
import React from 'react'

const container = document.getElementById('main')!

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
