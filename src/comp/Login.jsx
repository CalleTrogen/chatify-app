import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom";


function Login() {
    const [jwtToken, setJwtToken] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthed, setIsAuthed] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async () => {

        const response = await fetch('https://chatify-api.up.railway.app/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();

            // Sparar JWT i state & sessionStorage
            setJwtToken(data.token);
            sessionStorage.setItem('jwt', data.token);
            setIsAuthed(true);

            // Lyckad inlogg
            setTimeout(() => {
                navigate('/chat');
            }, 2000)
        } else {
            // Hantera fel vid inloggning
            console.log('Log in failed');
        }
    };


    return (
        <div className="flex flex-row justify-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-5xl text-gray-700">🔒 Log in</h1><br></br>
                <p className="text-gray-700">Welcome! Please put in your log in information below.</p><br></br>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        👤 Username:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}>
                    </input>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        🔑 Password:
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>

                </div>
                <div className="flex items-center justify-between">
                    <NavLink to='/'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Back</button>
                    </NavLink>
                    <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                    </button>
                </div>
            </form>
            {isAuthed && (<h1 className="text-white font-bold">Du loggas nu in... </h1>)}
        </div>
    )
}

export default Login;