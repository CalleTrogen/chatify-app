import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';

/* const [fakeChat, setFakeChat] = useState(''); */

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

    /* const [fakeChat, setFakeChat] = useState([
    {
            "text": "Hej, hur är läget?",
            "avatar": "",
            "username": "Johnny",
            "conversationId": null
        },
        {
            "text": "Det är bra med mig. Hur är det själv?",
            "avatar": "",
            "username": "Johnny",
            "conversationId": null
        },
        {
            "text": "Bara bra här",
            "avatar": "",
            "username": "Johnny",
            "conversationId": null
        }
    ]); */

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
            {/*  {fakeChat.map((chat, index) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <img src={chat.avatar} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <h4>{setFakeChat.username}</h4>
                    <p>{chat.text}</p>
                </div>
            ))} */}
        </div>

    );
};

export default AuthComponent;