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
    const [newMessage, setNewMessage] = useState('');
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
    const sendMessage = async () => {
        if (!newMessage.trim()) return;  // Förhindra att skicka tomma input fields.

        try {
            const response = await fetch(`https://chatify-api.up.railway.app/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + jwt  // Säkerställer att JWT token är skickat korrekt.
                },
                body: JSON.stringify({ text: newMessage }),  // Skickar det nya textmeddelandet
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Message sent:', data);
                setNewMessage('');  // Renskar input field efter att meddelandet har skickas.
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const deleteMessage = async (messageId) => {
        const jwt = sessionStorage.getItem('jwt');  // Hämtar JWT från sessionStorage
        try {
            const response = await fetch(`https://chatify-api.up.railway.app/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + jwt  // Authorization i headern
                },
            });

            if (response.ok) {
                // Tar bort 'deleted message' från local state
                setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== messageId));
            } else {
                console.error('Failed to delete message:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

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

            <div className="flex space-x-4 items-start w-full">
                {/* Message */}
                <div className="w-1/2">
                    <h2 className="mb-5 text-base">Message history:</h2>
                    {fakeChat.map((msg, index) => (
                        <div key={index} className="flex items-start space-x-4 p-1">
                            <img src={msg.avatar} alt={`${msg.username}'s avatar`} className="w-6 h-6 rounded-full" />
                            <strong>{msg.username}:&nbsp;</strong> {msg.text}
                        </div>
                    ))}
                </div>

                {/* Your Messages Section */}
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <h2 className="mb-5 text-base">Your messages:</h2>

                    <div className="space-y-4 w-full">
                        {messages && messages.length > 0 ? (
                            messages.map((msg, index1) => (
                                <div key={index1} className="flex justify-between space-x-4">
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
                                    {/* Delete Button */}
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => deleteMessage(msg.id)}  // Hämtar deleteMessage med message ID.
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No messages found.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* New Message Form */}
            <div className="form-control w-full mt-20 mx-auto">
                <div className="label items-center">
                    <span className="label-text">New Message</span>
                </div>
                <input
                    type="text"
                    placeholder="Type your message here"
                    className="input input-bordered w-full mt-4"
                />
            </div>


            <div className="label justify-end mt-4">
                <NavLink to="/" className="p-5">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                        Back
                    </button>
                </NavLink>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    onClick={sendMessage}  // Skickar meddelande
                >
                    Submit
                </button>
            </div>
        </div>


    );
};

export default AuthComponent;