import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const AuthComponent = () => {
    const [jwt, setJwt] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isAuthed, setIsAuthed] = useState(false);
    const [decodedJwt, setDecodedJwt] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Hämtar jwt från sessionStorage
        const savedJwt = sessionStorage.getItem('jwt');

        if (savedJwt) {
            const decodedJwt = JSON.parse(atob(savedJwt.split('.')[1]));
            sessionStorage.setItem('decodedJwt', JSON.stringify(decodedJwt));
            setDecodedJwt(decodedJwt);
            setJwt(savedJwt);
            setIsAuthed(true);
            setAvatarUrl(decodedJwt.avatar);
            setUsername(decodedJwt.user);
        }
    }, []);


    return (
        <div>
            {isAuthed ? (
                <div>
                    {avatarUrl && <img src={avatarUrl} alt="User Avatar" className="object-content h-30 w-20 inline-block rounded mb-5" />}
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome {username} </h1>
                    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">You are authenticated. Below you can read your chat history</p>
                    <div>
                        <NavLink to='/'>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Back</button>
                        </NavLink>
                    </div>
                </div>
            ) : (
                <h1>Couldn't be authenticated. Please try to log in again</h1>
            )}

        </div>

    );
};

export default AuthComponent;