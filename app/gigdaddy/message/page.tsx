"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Home,
  Briefcase,
  FileText,
  PhilippinePeso,
  MessageSquare,
  User,
  Settings,
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Check,
  CheckCheck,
  Clock,
  Phone,
  Video,
  Info,
  Image,
  File,
  Mic,
  Smile,
  ChevronLeft,
  Filter,
  Archive,
  Bell,
  Pin,
  Trash2,
  Star,
  Eye,
  EyeOff,
  Download,
  Plus,
  Shield,
  AlertCircle
} from "lucide-react";
import Head from "next/head";

function EmployeeMessage() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: 1, sender: "client", text: "Hi! Are you available for a lawn care job this weekend?", time: "10:30 AM", read: true },
    { id: 2, sender: "me", text: "Yes, I'm available! What time do you need me?", time: "10:32 AM", read: true },
    { id: 3, sender: "client", text: "Saturday morning, around 9 AM. It's a medium-sized yard.", time: "10:35 AM", read: true },
    { id: 4, sender: "me", text: "Perfect! I can do that. Can you share the address?", time: "10:36 AM", read: true },
    { id: 5, sender: "client", text: "123 Garden Street, Mandaluyong. How much do you charge?", time: "10:40 AM", read: true },
    { id: 6, sender: "me", text: "For medium yards, it's ₱500. Does that work for you?", time: "10:42 AM", read: false }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVerified, setIsVerified] = useState(false); // State to control blur/verification
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations = [
    {
      id: 0,
      name: "Maria Santos",
      lastMessage: "Perfect! I can do that. Can you share the address?",
      time: "10:36 AM",
      unread: 1,
      avatar: "MS",
      Location: "Mandaluyong",
      status: "active"
    },
    {
      id: 1,
      name: "John Smith",
      lastMessage: "When can you start the painting job?",
      time: "Yesterday",
      unread: 0,
      avatar: "JS",
      Location: "Pasig",
      status: "active"
    },
    {
      id: 2,
      name: "Support Team",
      lastMessage: "Your payment has been processed.",
      time: "Nov 11",
      unread: 0,
      avatar: "ST",
      Location: "Gigdaddy Support",
      status: "system"
    }
  ];

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.Location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBeFullyVerified = () => {
    router.push("/registration/accountVerification");
  };

  const handleRemoveBlur = () => {
    // For testing purposes only - will be removed when backend is connected
    setIsVerified(true);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (timeString: string) => {
    return timeString;
  };

  // Get current conversation data
  const currentConversation = selectedChat !== null ? conversations.find(conv => conv.id === selectedChat) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </Head>

      {/* Left Navigation */}
      <div className="w-64 bg-linear-to-b from-primary-50 to-white shadow-xl border-r border-gray-200 flex-col sticky top-0 h-screen hidden md:flex">
        <div className="p-6 border-b border-primary-100 bg-white">
          <div className="flex items-center space-x-3">
            <div>
              <img
                src="/gigdaddy-logo2.png"
                alt="Gigdaddy Logo"
                className="w-64 h-16"
              />
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
              Main Menu
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => router.push("/gigdaddy")}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-lg transition-all duration-200 group w-full text-left"
                >
                  <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/gigdaddy/myjobs")}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-lg transition-all duration-200 group w-full text-left"
                >
                  <Briefcase className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Browse Jobs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/gigdaddy/analytics")}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-lg transition-all duration-200 group w-full text-left"
                >
                  <PhilippinePeso className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Earnings</span>
                </button>
              </li>
              <li>
                <button className="flex items-center px-4 py-3 text-primary-700 bg-primary-50 rounded-lg border border-primary-200 shadow-sm w-full text-left">
                  <MessageSquare className="w-5 h-5 mr-3" />
                  <span className="font-semibold">Messages</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
              Account
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => router.push("/gigdaddy/profile")}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-lg transition-all duration-200 group w-full text-left"
                >
                  <User className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/gigdaddy/settings")}
                  className="flex items-center px-4 py-3 text-gray-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-lg transition-all duration-200 group w-full text-left"
                >
                  <Settings className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-primary-100 bg-white">
          <div className="flex items-center space-x-3 p-3 bg-linear-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-100">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-sm">JU</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                Jay-ar Untalan
              </p>
              <p className="text-xs text-primary-600 font-medium">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {!isVerified && (
          <>
            <div className="absolute inset-0 z-40 bg-white/50 backdrop-blur-sm pointer-events-none"></div>
            
            {/* Warning Modal */}
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
                {/* Warning Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-yellow-600" />
                  </div>
                </div>

                {/* Warning Text */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Verification Required
                  </h2>
                  <p className="text-gray-600">
                    You need to complete the document verification first to access messaging features.
                  </p>
                </div>

                {/* Stats/Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">0%</div>
                      <div className="text-xs text-gray-600">Verified</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">4</div>
                      <div className="text-xs text-gray-600">Docs Pending</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleBeFullyVerified}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Shield className="w-5 h-5" />
                    Be Fully Verified
                  </button>
                  
                  <button
                    onClick={handleRemoveBlur}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-300 text-sm"
                  >
                    Test Mode: Remove Blur (Development Only)
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Note: Full verification is required to send and receive messages with clients.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mobile Header - NOT blurred */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
          <div className="flex items-center gap-2">
            <img
              src="/gigdaddy-logo2.png"
              alt="Gigdaddy Logo"
              className="h-10 w-auto"
            />
          </div>
          <button className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-semibold text-sm">JU</span>
          </button>
        </div>

        {/* Main Messages Content - Inside the blur area */}
        <main className="flex-1 overflow-hidden flex">
          {/* Conversation List - Hidden on mobile when chat is open */}
          <div className={`${selectedChat !== null ? 'hidden md:flex' : 'flex'} w-full md:w-96 flex-col border-r border-gray-200 bg-white`}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Filter className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`flex items-start p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedChat === conversation.id ? "bg-primary-50 border-l-4 border-l-primary-500" : ""
                  }`}
                >
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      conversation.status === "system" 
                        ? "bg-purple-600" 
                        : conversation.status === "inactive"
                        ? "bg-gray-400"
                        : "bg-primary-600"
                    }`}>
                      {conversation.avatar}
                    </div>
                    {conversation.status === "active" && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
                        <p className="text-xs text-gray-500 truncate">{conversation.Location}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                        {conversation.unread > 0 && (
                          <span className="mt-1 px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <button className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                New Message
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${selectedChat === null ? 'hidden md:flex' : 'flex'} flex-1 flex-col`}>
            {selectedChat !== null && currentConversation ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b bg-white">
                  <div className="flex items-center">
                    <button
                      onClick={() => setSelectedChat(null)}
                      className="md:hidden mr-3 p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold mr-3">
                        {currentConversation.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{currentConversation.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            currentConversation.status === "active" ? "bg-green-500" : "bg-gray-400"
                          }`}></div>
                          <span className="text-xs text-gray-500">
                            {currentConversation.status === "active" ? "Online" : "Offline"} • {currentConversation.Location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Info className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py of-2 ${
                          message.sender === "me"
                            ? "bg-primary-600 text-white rounded-br-none"
                            : "bg-white border border-gray-200 rounded-bl-none"
                        }`}>
                          <p className="text-sm md:text-base">{message.text}</p>
                          <div className={`flex items-center justify-end mt-1 ${
                            message.sender === "me" ? "text-primary-100" : "text-gray-500"
                          }`}>
                            <span className="text-xs">{formatTime(message.time)}</span>
                            {message.sender === "me" && (
                              <span className="ml-1">
                                {message.read ? (
                                  <CheckCheck className="w-3 h-3" />
                                ) : (
                                  <Check className="w-3 h-3" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Image className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-200 rounded-full">
                          <Smile className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded-full">
                          <Mic className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className={`p-3 rounded-full ${
                        newMessage.trim()
                          ? "bg-primary-600 hover:bg-primary-700 text-white"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <button className="hover:text-primary-600">Add payment details</button>
                      <button className="hover:text-primary-600">Share location</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>Encrypted • Messages are secure</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="w-12 h-12 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Messages</h3>
                <p className="text-gray-600 max-w-md mb-6">
                  Select a conversation from the list to start messaging. 
                  Communicate with clients, discuss job details, and stay connected.
                </p>
                <button 
                  onClick={() => setSelectedChat(0)}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Start New Conversation
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Mobile Bottom Navigation - NOT blurred */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-md">
          <div className="flex justify-around py-3 text-gray-600">
            <button
              className="flex flex-col items-center text-sm"
              onClick={() => router.push("/gigdaddy")}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              className="flex flex-col items-center text-sm"
              onClick={() => router.push("/gigdaddy/myjobs")}
            >
              <Briefcase className="w-6 h-6" />
              <span className="text-xs mt-1">Jobs</span>
            </button>
            <button
              className="flex flex-col items-center text-sm"
              onClick={() => router.push("/gigdaddy/analytics")}
            >
              <PhilippinePeso className="w-6 h-6" />
              <span className="text-xs mt-1">Earnings</span>
            </button>
            <button
              className="flex flex-col items-center text-sm text-primary-600"
              onClick={() => router.push("/gigdaddy/messages")}
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs mt-1">Messages</span>
            </button>
            <button
              className="flex flex-col items-center text-sm"
              onClick={() => router.push("/gigdaddy/profile")}
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeMessage;