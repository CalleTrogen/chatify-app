import { NavLink } from "react-router-dom";

function Chat() {
    return (
        <>
            <h1>This is Chat</h1><br />
            <NavLink to='/'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Back</button>
            </NavLink>
        </>
    )
}

export default Chat