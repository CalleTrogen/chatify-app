import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './comp/Home';
import Register from './comp/Register';
import Login from './comp/Login';
import Chat from './comp/Chat';
import ProtectedRoute from './comp/ProtectedRoute';
/* import 'bootstrap/dist/css/bootstrap.min.css'; */

function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/chat' element={<Chat />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App