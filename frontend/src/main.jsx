
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store  from './app/Store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Takeinfo from './components/Takedata.jsx'
import Showuser from './components/Showuser.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='' element={<Takeinfo />} />
      <Route path='user' element={ <Showuser />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
   
  </Provider>,
)
