import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Send, X } from "lucide-react";
import API from "../api";

// eslint-disable-next-line react/prop-types
const MessagingSystem = ({ isOpen, onClose, userId, role }) => {
  const [conversations, setConversations] = useState([]);
  const [usersToChat, setUsersToChat] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch recent conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (!isOpen) return;

      try {
        setLoading(true);
        const response = await API.get("/messaging/chats");
        const conversationsData = response.data || [];
        console.log("Conversations fetched:", response.data);
        setConversations(
          Array.isArray(conversationsData) ? conversationsData : [],
        );
        setError(null);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setError("Failed to load conversations");
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [isOpen]);

  useEffect(() => {
    // Add auth token to axios defaults
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);
  // Fetch available users
  useEffect(() => {
    const fetchAvailableUsers = async () => {
      if (!isOpen) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Fetch users from the backend
        const response = await API.get(`/messaging/available-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const usersData = response.data || [];

        // Exclude the current user
        console.log("Available users fetched:", response.data);
        const filteredUsers = usersData.filter((user) => user._id !== userId);
        setUsersToChat(filteredUsers);

        setError(null);
      } catch (error) {
        console.error(
          "Error fetching available users:",
          error.response || error,
        );
        setError(
          error.response?.data?.message || "Failed to load available users",
        );
        setUsersToChat([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableUsers();
  }, [isOpen, userId]);

  // Filter users based on search
  const filteredUsers = usersToChat.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.role?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower)
    );
  });

  // Filter conversations based on search
  const filteredConversations = conversations.filter((conv) => {
    const otherParticipant = conv.participants?.find((p) => p._id !== userId);
    const searchLower = searchTerm.toLowerCase();
    return (
      otherParticipant?.firstName?.toLowerCase().includes(searchLower) ||
      otherParticipant?.lastName?.toLowerCase().includes(searchLower) ||
      otherParticipant?.role?.toLowerCase().includes(searchLower)
    );
  });

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId) => {
    try {
      const response = await API.get(`/messaging/${conversationId}`); // Pass the conversationId
      const messagesData = response.data || [];
      setMessages(messagesData); // Replace messages with the fetched ones
      console.log("Messages fetched:", messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]); // Clear messages on error
    }
  };

  // Start a new conversation
  const startConversation = async (receiverId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.post(
        "/messaging/start",
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        // Set the active conversation and fetch messages
        setActiveConversation(response.data);
        fetchMessages(response.data._id); // Fetch messages for the new conversation
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
      alert(error.response?.data?.message || "Failed to start conversation");
    }
  };

  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const handleConversationSelect = (conversation) => {
    setMessages([]); // Clear previous messages
    setActiveConversation(conversation);
    fetchMessages(conversation._id);
  };

  // Send a message
  const handleSendMessage = async () => {
    if (!message.trim() || !activeConversation?._id) return;

    try {
      const response = await API.post("/messaging/send", {
        conversationId: activeConversation._id,
        content: message.trim(),
      });

      if (response.data) {
        // Update messages directly
        setMessages((prev) => [...prev, response.data]);

        // Update the last message in the conversation list
        setConversations((prev) =>
          prev.map((conv) =>
            conv._id === activeConversation._id
              ? {
                  ...conv,
                  lastMessage: response.data.content,
                  lastUpdated: response.data.timestamp,
                }
              : conv,
          ),
        );

        // Clear the input field
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  if (!isOpen) return null;

  // Rest of your render code remains the same...
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[600px] flex overflow-hidden relative">
        {/* Close Button */}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(600px-73px)]">
            {loading ? (
              <div className="p-4 text-gray-500">Loading users...</div>
            ) : error ? (
              <div className="p-4 text-red-500">{error}</div>
            ) : (
              <>
                <h3 className="p-4 font-medium">Start a New Conversation</h3>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <div
                      key={`available-user-${user._id}-${index}`}
                      onClick={() => {
                        console.log("User clicked:", user);
                        startConversation(user._id);
                      }}
                      className="p-4 border-b cursor-pointer hover:bg-gray-100"
                    >
                      <h3 className="font-medium">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{user.role}</p>
                      {user.profile?.companyName && (
                        <p className="text-xs text-gray-400">
                          {user.profile.companyName}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 p-4">
                    {searchTerm
                      ? "No users match your search."
                      : role === "student"
                        ? "Apply to internships to chat with recruiters"
                        : "No users available for chat"}
                  </p>
                )}

                {/* Recent Conversations */}
                {filteredConversations.length > 0 && (
                  <>
                    <h3 className="p-4 font-medium mt-4">
                      Recent Conversations
                    </h3>
                    {filteredConversations.map((chat, index) => (
                      <div
                        key={`conversation-${chat._id}-${index}`}
                        onClick={() => {
                          console.log("Selected conversation:", chat);
                          setActiveConversation(chat);
                          fetchMessages(chat._id);
                        }}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                          activeConversation?._id === chat._id
                            ? "bg-blue-50"
                            : ""
                        }`}
                      >
                        <h3 className="font-medium">
                          {chat.participants?.find((p) => p._id !== userId)
                            ?.firstName || "Unknown"}{" "}
                          {chat.participants?.find((p) => p._id !== userId)
                            ?.lastName || "User"}
                        </h3>
                        {chat.lastMessage && (
                          <p className="text-sm text-gray-500 truncate">
                            {chat.lastMessage}
                          </p>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white">
                <h2 className="font-medium">
                  {activeConversation.participants
                    ?.filter((p) => p._id !== userId)
                    .map((p) => `${p.firstName} ${p.lastName}`)
                    .join(", ")
                    .split(", ")[1] || "Unknown"}
                </h2>
                <p className="text-sm text-gray-500">
                  {activeConversation.participants
                    ?.filter((p) => p._id !== userId)
                    .map((p) => p.role)
                    .join(", ")
                    .split(", ")[1] || ""}
                </p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={`message-${msg._id}-${msg.timestamp}`}
                    className={`flex ${
                      msg.sender._id === userId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.sender._id === userId
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;
