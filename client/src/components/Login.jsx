import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CounterContext } from "../context/Counter";

function Login() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const counterState = useContext(CounterContext);

  useEffect(() => {
    if (counterState.displayName) setUsername(counterState.displayName);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && room) {
      navigate(`/chat?username=${username}&room=${room}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Room Number:</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
