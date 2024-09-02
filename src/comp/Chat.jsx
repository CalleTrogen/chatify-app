import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const AuthComponent = () => {
    const [jwt, setJwt] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        // Hämtar jwt från sessionStorage
        const savedJwt = sessionStorage.getItem('jwt');
        if (savedJwt) {
            setJwt(savedJwt);
            setIsAuthed(true);
        }
        // Hämtar avatar från sessionStorage
        const savedAvatarUrl = sessionStorage.getItem('avatar');
        if (savedAvatarUrl) {
            setAvatarUrl(savedAvatarUrl);
        }
    }, []);


    return (
        <div>
            {isAuthed ? (
                <div>
                    <h1>You are authenticated</h1>
                    {avatarUrl && <img src={avatarUrl} alt="User Avatar" />}<br />
                    <NavLink to='/'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Back</button>
                    </NavLink>
                </div>
            ) : (
                <h1>Please log in</h1>
            )}
        </div>
    );
};

/* function Chat() {
    return (
        <>
            <h1>This is Chat</h1><br />
        </>
    )
} */

export default AuthComponent;