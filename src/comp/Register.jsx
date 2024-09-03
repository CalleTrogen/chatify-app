import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
    const [csrfToken, setCsrfToken] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const avatars = Array.from({ length: 3 }, (_, index) =>
        `https://i.pravatar.cc/150?img=${index + 1}`
    );
    const navigate = useNavigate();

    //Hämtar csrf token 
    useEffect(() => {
        fetch('https://chatify-api.up.railway.app/csrf', {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => setCsrfToken(data.csrfToken))
            .catch(err => console.error('Failed to fetch CSRF token', err));
    }, []);

    //Fetch request för att registrerar användare
    const handleRegister = () => {
        fetch('https://chatify-api.up.railway.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                avatar: avatarUrl,
                csrfToken: csrfToken
            }),

        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    // TODO: Visa ett meddelande om lyckad registrering
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            })
            .catch(err => console.error('Registration failed:', err));
    };

    return (
        <>
            <div className="container w-8/12 mx-auto">
                <h1 className="text-grey-50 text-5xl mb-10 font-bold">Register new user</h1>
                <p>Below you can register a new username. Please fill in all columns.</p>
                <label className="input input-bordered flex items-center gap-2 m-3" >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 m-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text"
                        className="grow"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 m-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password"
                        className="grow"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </div>
            <h2 className="p-5 text-2xl">Please select an avatar:</h2>
            <div className="flex flex-row gap-x-5">
                {avatars.map((url, index) => (
                    <img key={index} src={url} alt={`Avatar ${index + 1}`} className="cursor-pointer" onClick={() => setAvatarUrl(url)} />
                ))}
            </div>
            <div className="mt-5">
                <NavLink to='/'>
                    <button className="bg-blue-700 text-white font-bold py-2 px-4 mt-2 mb-5">Back</button>
                </NavLink>
                <button onClick={handleRegister} className="bg-blue-700 text-white font-bold py-2 px-4 mt-2 mb-5 m-3">Register</button>
            </div>
        </>
    )
}

export default Register;