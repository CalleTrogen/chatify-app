import { NavLink } from "react-router-dom";

let avatars = sessionStorage.getItem("avatars");
let token = sessionStorage.getItem("jwt");

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

console.log(avatars);
console.log(token);

export default Chat