import { useState, useEffect } from "react"

const Login = () => {
    return (
        <div>
            <h1 className="text-gray-50 text-5xl text-bold p-5">Log in</h1>
            <p className="mb-5">Below you can log in to start chatting</p>
            <label className="">Username:</label>
            <input type="text" className="ml-3 bg-white rounded"></input>
            <label className="">Password:</label>
            <input type="text" className="ml-3 bg-white rounded"></input>
        </div>
    )
}

export default Login;