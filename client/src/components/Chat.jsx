import React, { useState, useEffect, useRef } from 'react';

function Chat({ socket, username }) {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => [...prevMessages, { ...message, type: 'chat' }]);
    };
    const userJoinedListener = (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `${data.username} has joined the chat.`, type: 'notification' },
      ]);
    };
    const userLeftListener = (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `${data.username} has left the chat.`, type: 'notification' },
      ]);
    };

    socket.on('receive_message', messageListener);
    socket.on('user_joined', userJoinedListener);
    socket.on('user_left', userLeftListener);

    return () => {
      socket.off('receive_message', messageListener);
      socket.off('user_joined', userJoinedListener);
      socket.off('user_left', userLeftListener);
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim() && username) {
      const messageData = {
        username,
        text: currentMessage,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send_message', messageData);
      setCurrentMessage('');
    }
  };

  const renderMessage = (msg, index) => {
    if (msg.type === 'notification') {
      return (
        <div key={index} className="text-center my-2">
          <span className="text-gray-500 text-sm italic">{msg.text}</span>
        </div>
      );
    }

    const isCurrentUser = msg.username === username;
    const messageClass = isCurrentUser ? 'bg-blue-600 self-end' : 'bg-gray-600 self-start';
    const alignmentClass = isCurrentUser ? 'flex-row-reverse' : 'flex-row';

    return (
      <div key={index} className={`flex items-end gap-2 mb-4 ${alignmentClass}`}>
        <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
          {!isCurrentUser && (
            <span className="text-xs text-gray-400 mb-1">{msg.username}</span>
          )}
          <div className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md ${messageClass}`}>
            <p>{msg.text}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col">
          {messages.map(renderMessage)}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={sendMessage} className="p-4 bg-gray-700 flex items-center">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="flex-grow bg-gray-600 border border-gray-500 rounded-l-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
