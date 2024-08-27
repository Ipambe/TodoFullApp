import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import TodoFullApp from './TodoFullApp.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TodoFullApp />
  </BrowserRouter>
)
