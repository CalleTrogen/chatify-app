import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";


function Login() {


    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-5xl text-gray-700">🔒 Log in</h1><br></br>
                <p className="text-gray-700">Welcome! Please put in your log in information below.</p><br></br>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        👤 Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        🔑 Password
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="**********"></input>

                </div>
                <div className="flex items-center justify-between">
                    <NavLink to='/'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Back</button>
                    </NavLink>
                    <button onClick={Login} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                    </button>
                    <button className="bg-green-500 font-bold text-black p-2">
                        <NavLink to='/chat'>chat</NavLink>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login;