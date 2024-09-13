import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
    return (
        <>
            <h1 className='text-gray-50 text-7xl font-bold mt-[20vh]'>
                Welcome to <em>Chatify</em> 💬
            </h1>

            <h3 className='m-10 text-xl'>
                We're excited to have you here.
                Whether you're catching up with friends, collaborating on a project, or meeting new people,
                this is the place to make your conversations smooth, fun, and secure.
                Please click on the <em>textfield</em> below to open the side menu.
            </h3>
            <Navbar />
        </>
    )
}

export default Home