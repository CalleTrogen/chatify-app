import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './comp/Home';
import Register from './comp/Register';
import Login from './comp/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App