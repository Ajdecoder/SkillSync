import React, { useEffect, useState, useRef } from "react";
import { getChatResponse, getUserProfileByEmail } from "../../services/api";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ChatGuru",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: "Hello! I'm your SkillSync assistant. How can I help you today?",
      alignment: "left",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [quickQuestionsVisible, setQuickQuestionsVisible] = useState(true);

  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const predefinedResponses = {
    "What is SkillSync?":
      "SkillSync connects businesses with skilled professionals for flexible work opportunities.",
    "How to post a job?":
      "To post a job, go to the 'Add Opportunity' page and fill in the details. You'll need to provide job title, description, requirements, and compensation details.",
    "How to update my profile?":
      "Go to your dashboard, click on 'Edit Profile', and make your changes. Don't forget to save your updates!",
    "How do I apply for a job?":
      "Find a job that matches your skills on the Talent Search page, review the details, and click 'Apply'. You may need to submit a resume or portfolio.",
    "Is SkillSync free to use?":
      "Yes, SkillSync is completely free for professionals. Employers have access to basic features for free with optional premium upgrades.",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser?.email) return;
      try {
        const profile = await getUserProfileByEmail(currentUser?.email);
        setUserId(
          profile?.data?.candidateProfile?._id ||
            profile?.data?.recruiterProfile?._id
        );
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuickQuestion = (question) => {
    setQuickQuestionsVisible(false);
    handleMessageSend(question);
  };

  const handleClearChat = () => {
    setMessages([messages[0]])
    setInputText("");
  }

  const handleMessageSend = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: "You",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: text.trim(),
      alignment: "right",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Check for predefined response
    const predefinedReply = predefinedResponses[text];
    if (predefinedReply) {
      setIsTyping(true);
      setTimeout(() => {
        const botReply = {
          id: Date.now() + 1,
          sender: "ChatGuru",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          text: predefinedReply,
          alignment: "left",
        };
        setMessages((prev) => [...prev, botReply]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    // Handle custom queries
    setIsTyping(true);
    try {
      const response = await getChatResponse({ text, id: userId });
      console.log("response", response);
      const words = response.data.response
        .replace(/\*{1,3}(.*?)\*{1,3}/g, "$1")
        .split(" ");
      const botId = Date.now() + 1;

      // Initial empty message
      setMessages((prev) => [
        ...prev,
        {
          id: botId,
          sender: "ChatGuru",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          text: "",
          alignment: "left",
        },
      ]);

      // Typewriter effect
      words.forEach((word, idx) => {
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botId
                ? { ...msg, text: msg.text + (idx > 0 ? " " : "") + word }
                : msg
            )
          );
          if (idx === words.length - 1) {
            setIsTyping(false);
          }
        }, idx * 50);
      });
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ChatGuru",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          text: "I'm having trouble connecting right now. Please try again later.",
          alignment: "left",
        },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
  <motion.button
    onClick={() => {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setQuickQuestionsVisible(true);
      }
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg relative top-0"
  >
    {isOpen ? (
      <i className="fa-solid fa-xmark text-white text-xl" />
    ) : (
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-2xl">💬</span>
      </motion.div>
    )}
    {!isOpen && messages.length > 1 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {Math.round((messages.length - 1) / 2)}
      </span>
    )}
  </motion.button>

  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-3 right-3 w-[90vw] max-w-md h-[36rem] max-h-[60rem] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl z-[1000] flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden"
      data-lenis-prevent
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i className="fa-regular fa-comment-dots text-white text-lg" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">ChatGuru</h2>
            <p className="text-xs text-white/80">
              {isTyping ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleClearChat()  }
            className="p-2 text-white/80 hover:text-white"
            title="Clear chat"
          >
            <i className="fa-solid fa-trash-can text-sm" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-white/80 hover:text-white"
            title="Minimize"
          >
            <i className="fa-solid fa-minimize text-sm" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
        data-lenis-prevent
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.alignment === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                msg.alignment === "right"
                  ? "bg-blue-100 dark:bg-blue-600 text-gray-900 dark:text-white rounded-br-none"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
              }`}
            >
              {msg.alignment === "left" && (
                <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">
                  {msg.sender}
                </p>
              )}
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <p
                className={`text-[10px] text-gray-500 dark:text-gray-300 mt-1 ${
                  msg.alignment === "right" ? "text-right" : "text-left"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-none max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {quickQuestionsVisible && messages.length <= 1 && (
        <div className="px-4 pb-3">
          <div className="text-xs text-gray-500 dark:text-gray-300 mb-2 px-2">
            Quick questions:
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(predefinedResponses).map((q, i) => (
              <motion.button
                key={i}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickQuestion(q)}
                className="text-left p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-600/20 transition-all text-xs text-gray-700 dark:text-white"
              >
                {q}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-1 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMessageSend(inputText);
          }}
          className="flex flex-row items-center gap-2 m-0 dark:bg-gray-800"
        >
          <input
            type="text"
            placeholder="Type your message..."
            className={`flex-1 p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-700 ${isTyping && "cursor-not-allowed"}`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-paper-plane" />
          </button>
        </form>
      </div>
    </motion.div>
  )}
</div>

  );
};
