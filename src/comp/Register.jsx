import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Register() {
    const [csrfToken, setCsrfToken] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [showFieldAlert, setShowFieldAlert] = useState(false); // Alert för ett missat input fält.
    const [showAvatarAlert, setShowAvatarAlert] = useState(false); // Alert för missad avatar.

    const avatars = Array.from({ length: 3 }, (_, index) =>
        `https://i.pravatar.cc/150?img=${index + 1}`
    );

    // Fetch CSRF token
    useEffect(() => {
        fetch('https://chatify-api.up.railway.app/csrf', {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => setCsrfToken(data.csrfToken))
            .catch(err => console.error('Failed to fetch CSRF token', err));
    }, []);

    const handleRegister = () => {
        let hasError = false;

        // Tittar om något imput saknas
        if (!username || !password || !email) {
            setShowFieldAlert(true);
            hasError = true;
        } else {
            setShowFieldAlert(false); // Gömmer alert om alla fält är ifyllda
        }
        console.log('Has error', hasError);
        // Tittar om en avatar är vald eller ej.
        if (!avatarUrl) {
            setShowAvatarAlert(true);
            hasError = true;
        } else {
            setShowAvatarAlert(false); // Gömmer alert om en avatar är vald.
        }

        // Om det inte blir en error.
        if (hasError) {
            console.log('No error, proceeding with registration')
            return;
        }
        // Registreringsprocessen
        fetch('https://chatify-api.up.railway.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                email,
                avatar: avatarUrl,
                csrfToken
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log('JWT Token:', data.token);
            })
            .catch(err => {
                console.error('Registration failed:', err);
            });
    };

    useEffect(() => {
        // Gömmer alert efter 5 sekunder.
        if (showFieldAlert || showAvatarAlert) {
            const timer = setTimeout(() => {
                setShowFieldAlert(false);
                setShowAvatarAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showFieldAlert, showAvatarAlert]);

    return (
        <>
            <div className="container w-6/12 mx-auto">
                <h1 className="text-grey-50 text-5xl mb-10 font-bold">Register new user</h1>
                <p>Below you can register a new username. Please fill in all columns.</p>
                <label className="input input-bordered flex items-center gap-2 m-3">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 m-3">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 m-3">
                    <input
                        type="password"
                        className="grow"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </div>
            <h2 className="p-5 text-2xl">Please select an avatar:</h2>
            <div className="flex flex-row gap-x-5 justify-center">
                {avatars.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Avatar ${index + 1}`}
                        className={`cursor-pointer border-4 ${avatarUrl === url ? 'border-blue-500' : 'border-transparent'
                            } rounded-full`}
                        onClick={() => setAvatarUrl(url)} // Sätter avatarn
                    />
                ))}
            </div>
            <div className="mt-5">
                <NavLink to='/'>
                    <button className="bg-blue-700 text-white font-bold py-2 px-4 mt-2 mb-5">Back</button>
                </NavLink>
                <button onClick={handleRegister} className="bg-blue-700 text-white font-bold py-2 px-4 mt-2 mb-5 m-3">Register</button>
            </div>

            {/* Visar alert för missat inputfält */}
            {showFieldAlert && (
                <div className="bg-red-500 text-white text-center p-5 mt-5 rounded shadow-md w-6/12 mx-auto">
                    Missing username, password, or email address.
                </div>
            )}

            {/* Visar alert för missad avatar */}
            {showAvatarAlert && (
                <div className="bg-red-500 text-white text-center p-5 mt-3 rounded shadow-md w-6/12 mx-auto">
                    Please select an avatar to continue.
                </div>
            )}
        </>
    );
}

export default Register;