import './App.css'
import Navbar from './comp/Navbar'

function App() {

  return (
    <>
      <h1 className='text-gray-50 text-7xl font-bold'>Welcome to Chatify</h1>
      <h3 className='m-10 text-xl'>
        We're excited to have you here.
        Whether you're catching up with friends, collaborating on a project, or meeting new people,
        this is the place to make your conversations smooth, fun, and secure.
        Please click the button below to open the side menu.
      </h3>
      <Navbar />
    </>
    
    
  )
}

export default App
