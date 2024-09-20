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
        },
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
        fetchMessages();
    }, []);


    const [messages, setMessages] = useState([]);
    const fetchMessages = async () => {

        try {
            const response = await fetch(`https://chatify-api.up.railway.app/messages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
                },
            });
            const data = await response.json();
            console.log(data)
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Skicka nytt meddelande 
    /* const [newMessage, setNewMessage] = useState([]);
    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await fetch(``, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + jwt
                },
                body: JSON.stringify({
                    text: newMessage,
                }),
            }); */


    return (
        <div>
            {isAuthed ? (
                <div>
                    {avatarUrl && <img src={avatarUrl} alt="User Avatar" className="object-content h-30 w-20 inline-block rounded mb-5" />}
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome {username} </h1>
                    <h2 className="mb-6 text-lg font-normal text-green-500 lg:text-xl sm:px-16 xl:px-48">You are authenticated!</h2>

                </div>
            ) : (
                <h1>Couldn't be authenticated. Please try to log in again.</h1>
            )}
            <h2 className="flex items-start space-x-4 mb-5 text-base">Message history:</h2>
            {fakeChat.map((msg, index) => (
                <div key={index} className="flex items-start space-x-4 p-1 w-1/2">
                    <img src={msg.avatar} alt={`${msg.username}'s avatar`} className="w-6 h-6 rounded-full" />
                    <strong>{msg.username}:&nbsp;</strong> {msg.text}
                </div>
            ))}
            <h2 className="flex text-base justify-end w-1/2">Your messages:</h2>
            <div className="space-y-4 w-1/2">
                <div className="space-y-4 w-1/2">
                    {messages && messages.length > 0 ? (
                        messages.map((msg, index1) => (
                            <div key={index1} className="flex space-x-4">
                                <div className="max-w-xs p-4 rounded-lg bg-gray-100 flex flex-row space-x-2 items-center">
                                    <img
                                        src={decodedJwt?.avatar || '/default-avatar.png'}
                                        alt="User Avatar"
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <strong className="text-lg text-gray-500">
                                        {decodedJwt?.user || 'Unknown'}:
                                    </strong>
                                    <p className="text-gray-700">{msg.text}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No messages found.</p>
                    )}
                </div>
                {/*  {messages.length > 0 ? (
                    messages.map((msg, index1) => (
                        <div key={index1} className="flex justify-end space-x-4">
                            <div className="max-w-xs p-4 rounded-lg bg-gray-100 flex flex-row space-x-2">
                                <strong className="text-lg text-gray-500">{decodedJwt.user}:<img src={decodedJwt.avatar} className="w-6 h-6 float-left rounded-full" /></strong>
                                <p className="text-gray-700">{msg.text}</p>
                            </div>
                        </div>
                    )) */}
                : (
                <label className="form-control w-full max-w-xs">
                    <div className="label items-center">
                        <span className="label-text">New Message</span>
                    </div>
                    <input type="text" placeholder="Type your message here" className="input input-bordered w-full max-w-xs" />
                    <div className="label justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3">Submit</button>
                    </div>
                </label>
                )}
            </div>
            <NavLink to='/' className="p-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5">Back</button>
            </NavLink>
        </div >
    );
};

export default AuthComponent;