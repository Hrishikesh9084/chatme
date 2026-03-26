import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import UsernameForm from './components/UsernameForm';
import Chat from './components/Chat';

const SOCKET_URL = 'http://localhost:3001';

function App() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to socket server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from socket server');
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleUsernameSubmit = (newUsername) => {
    if (newUsername.trim()) {
      setUsername(newUsername);
      socket.emit('join_chat', newUsername);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-2xl h-[80vh] flex flex-col bg-gray-800 rounded-lg shadow-xl">
        <header className="bg-gray-700 p-4 rounded-t-lg">
          <h1 className="text-2xl font-bold text-center">Genesis.ai Chat</h1>
          <div className="text-center text-sm text-gray-400 mt-1">
            Status: {isConnected ? <span className="text-green-400">Connected</span> : <span className="text-red-400">Disconnected</span>}
          </div>
        </header>
        
        <main className="flex-grow p-4 overflow-y-auto">
          {!username ? (
            <UsernameForm onUsernameSubmit={handleUsernameSubmit} />
          ) : (
            <Chat socket={socket} username={username} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
