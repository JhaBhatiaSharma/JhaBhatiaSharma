import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, Search, Send, User, X } from 'lucide-react';

const MessagingSystem = ({ isOpen, onClose, userId }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await axios.get(`/api/chats`);
        setConversations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setConversations([]);
      }
    };

    if (isOpen) fetchConversations();
  }, [isOpen]);

  const fetchMessages = async (conversationId) => {
    try {
      const { data } = await axios.get(`/api/messages/${conversationId}`);
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const newMessage = {
          conversationId: activeConversation._id,
          senderId: userId,
          content: message,
        };
        const { data } = await axios.post('/api/messages', newMessage);
        setMessages([...messages, data]);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const startNewConversation = async (receiverId) => {
    try {
      const { data } = await axios.post('/api/chats/start', {
        participants: [userId, receiverId],
      });
      setActiveConversation(data);
      fetchMessages(data._id);
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[600px] flex overflow-hidden relative">
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
            {conversations.map((chat) => (
              <div
                key={chat._id}
                onClick={() => {
                  setActiveConversation(chat);
                  fetchMessages(chat._id);
                }}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                  activeConversation?._id === chat._id ? 'bg-blue-50' : ''
                }`}
              >
                <h3>
                  {chat.participants
                    .find((participant) => participant._id !== userId)
                    ?.firstName}
                </h3>
                <p>
                  {chat.participants
                    .find((participant) => participant._id !== userId)
                    ?.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              <div className="p-4 border-b bg-white">
                <h2>
                  {activeConversation.participants
                    .find((participant) => participant._id !== userId)
                    ?.firstName}
                </h2>
                <p>
                  {activeConversation.participants
                    .find((participant) => participant._id !== userId)
                    ?.role}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.sender._id === userId ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.sender._id === userId
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className="text-xs mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t bg-white flex">
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
                  className="ml-2 p-2 bg-blue-600 text-white rounded-lg"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;
