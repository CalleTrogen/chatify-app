import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";


function Login() {


    return (
        <div class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-5xl text-gray-700">🔒 Log in</h1><br></br>
                <p className="text-gray-700">Welcome! Please put in your log in information below.</p><br></br>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        👤 Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        🔑 Password
                    </label>
                    <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="**********"></input>

                </div>
                <div class="flex items-center justify-between">
                    <NavLink to='/'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Back</button>
                    </NavLink>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login;