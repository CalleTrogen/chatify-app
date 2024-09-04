import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const AuthComponent = () => {
    const [jwt, setJwt] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isAuthed, setIsAuthed] = useState(false);
    const [decodedJwt, setDecodedJwt] = useState(null);
    const [username, setUsername] = useState('');
    const [fakeChat, setFakeChat] = useState([
        {
            "text": "Hej, hur är läget?",
            "avatar": "https://i.pravatar.cc/150?img=3",
            "username": "Calle",
            "conversationId": null
        },
        {
            "text": "Det är bra med mig. Hur är det själv?",
            "avatar": "https://i.pravatar.cc/150?img=1",
            "username": "Calle2",
            "conversationId": null
        },
        {
            "text": "Bara bra här.",
            "avatar": "https://i.pravatar.cc/150?img=3",
            "username": "Calle",
            "conversationId": null
        }
    ]);

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

    /* const updatedChat = fakeChat.map(message => ({ //TODO: innehåller meddelande kopplat till ett specifikt username:
        ...message,
        avatar: decodedJwt.avatar,
        username: decodedJwt.user
    }));
    setFakeChat(updatedChat); */

    return (
        <div className="">
            {isAuthed ? (
                <div>
                    {avatarUrl && <img src={avatarUrl} alt="User Avatar" className="object-content h-30 w-20 inline-block rounded mb-5" />}
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome {username} </h1>
                    <h2 className="mb-6 text-lg font-normal text-green-500 lg:text-xl sm:px-16 xl:px-48">You are authenticated!</h2>
                </div>
            ) : (
                <h1>Couldn't be authenticated. Please try to log in again.</h1>
            )}
            <h2 className="flex item-start space-x-4 mb-5 text-base">Message history</h2>
            {fakeChat.map((msg, index) => (
                <div key={index} className="flex item-start space-x-4 p-1">
                    <img src={msg.avatar} alt={`${msg.username}'s avatar`} className="w-6 h-6 rounded-full" />
                    <strong>{msg.username}:&nbsp;</strong> {msg.text}
                </div>
            ))}
            <NavLink to='/'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5">Back</button>
            </NavLink>
        </div>
    );
};

export default AuthComponent;