//frontend/src/Pages/MessagingSystem.jsx
import React, { useState } from 'react';
import { MessageSquare, Search, Send, User, X } from 'lucide-react';

const MessagingSystem = ({ isOpen, onClose }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: 1,
      name: 'TechCorp HR',
      role: 'Company',
      lastMessage: 'Looking forward to your interview!',
      unread: 2,
      messages: [
        { id: 1, sender: 'them', text: 'Hello! Thanks for applying to TechCorp.', time: '10:00 AM' },
        { id: 2, sender: 'them', text: 'We would like to schedule an interview.', time: '10:01 AM' },
        { id: 3, sender: 'me', text: 'Thank you! I am very interested.', time: '10:05 AM' },
        { id: 4, sender: 'them', text: 'Looking forward to your interview!', time: '10:06 AM' },
      ]
    },
    {
      id: 2,
      name: 'WebSolutions Admin',
      role: 'Administrator',
      lastMessage: 'Your application is under review',
      unread: 1,
      messages: [
        { id: 1, sender: 'them', text: 'Hi, we received your application.', time: '11:30 AM' },
        { id: 2, sender: 'them', text: 'Your application is under review', time: '11:31 AM' },
      ]
    },
    {
      id: 3,
      name: 'Career Services',
      role: 'Administrator',
      lastMessage: 'Here are the upcoming career events',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', text: 'Hello! Here are the upcoming career events', time: '09:00 AM' },
        { id: 2, sender: 'me', text: 'Thank you for the information!', time: '09:15 AM' },
      ]
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[600px] flex overflow-hidden relative">
        {/* Close Button - Added absolute positioning at the top-right corner */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>

        {/* Sidebar */}
        <div className="w-1/3 border-r bg-gray-50">
          <div className="p-4 border-b bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(600px-73px)]">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                  activeChat?.id === chat.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{chat.name}</h3>
                      <p className="text-sm text-gray-500">{chat.role}</p>
                    </div>
                  </div>
                  {chat.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1 truncate">{chat.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-medium">{activeChat.name}</h2>
                  <p className="text-sm text-gray-500">{activeChat.role}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.sender === 'me'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-2" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;