import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./chatbot.css";
import { PORT_CLIENT } from "../../commonClient";
import { getChatResponse } from "../../services/api";
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { FaForward } from "react-icons/fa";

export const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ChatGuru",
      time: "11:46",
      text: "That's awesome. I think our users will really appreciate the improvements.",
      status: "Delivered ✔",
      alignment: "center",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [premenu, setPremenu] = useState(false)

  useEffect(() => {
    const chatContainer = document.querySelector(".chatbot-container");

    if (chatContainer) {
      chatContainer.addEventListener(
        "wheel",
        (event) => {
          event.stopPropagation(); // Stop event bubbling to the page
        },
        { passive: false }
      );
    }

    return () => {
      chatContainer?.removeEventListener("wheel", (event) =>
        event.stopPropagation()
      );
    };
  }, []);

  const lenis = useLenis(); // Get Lenis instance

  useEffect(() => {
    const chatContainer = document.querySelector(".chatbot-container");

    if (chatContainer) {
      chatContainer.addEventListener("mouseenter", () => {
        lenis?.stop(); // Stop Lenis when hovering over chatbot
      });

      chatContainer.addEventListener("mouseleave", () => {
        lenis?.start(); // Re-enable Lenis when leaving chatbot
      });
    }

    return () => {
      chatContainer?.removeEventListener("mouseenter", () => lenis?.stop());
      chatContainer?.removeEventListener("mouseleave", () => lenis?.start());
    };
  }, [lenis]);

  const predefinedResponses = {
    "What is SkillSync?":
      "SkillSync connects businesses with skilled professionals for flexible work opportunities.",
    "How to post a job?":
      "To post a job, go to the 'Add Opportunity' page and fill in the details.",
    "How to update my profile?":
      "Go to your dashboard, click on 'Edit Profile', and make changes.",
  };

  // Send predefined message
  const handlePredefinedMessage = (message) => {
    setInputText(message); // Set input field to predefined question

    const userMessage = {
      id: messages.length + 1,
      sender: "You ",
      time: new Date().toLocaleTimeString(),
      text: message,
      status: "Sent ✔",
      alignment: "right",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Check for predefined answer
    const predefinedAnswer = predefinedResponses[message];
    if (predefinedAnswer) {
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          sender: "ChatGuru",
          time: new Date().toLocaleTimeString(),
          text: predefinedAnswer,
          status: "Delivered ✔",
          alignment: "left",
        };

        setInputText("");
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000); // Delay of 1 second
    } else {
      // Handle non-predefined messages
      sendMessage(message);
    }
  };

  // Send user input message
  const sendMessage = async (message) => {
    if (message.trim() === "") return;
  
    const userMessage = {
      id: messages.length + 1,
      sender: "You",
      time: new Date().toLocaleTimeString(),
      text: message,
      status: "Sent ✔",
      alignment: "right",
    };
  
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    try {
      const response = await getChatResponse({ text: message });
      const fullText = response.data.res; // Full response text
      let words = fullText.split(" ");
      let botMessage = {
        id: messages.length + 2,
        sender: "ChatGuru",
        time: new Date().toLocaleTimeString(),
        text: "", // Start empty, words will be appended
        status: "Typing...",
        alignment: "left",
      };
  
      setMessages((prevMessages) => [...prevMessages, botMessage]);
  
      words.forEach((word, index) => {
        setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === botMessage.id
                ? { ...msg, text: msg.text + " " + word, status: "Delivered ✔" }
                : msg
            )
          );
        }, index * 88) // Delay each word by 200ms
      });
      setInputText('')
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = {
        id: messages.length + 2,
          er: "ChatGuru",
        time: new Date().toLocaleTimeString(),
        text: "Sorry, I couldn't process your message. Please try again.",
        status: "Error",
        alignment: "left",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };
  

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: "fixed",
          bottom: " 1.2em",
          right: "1.3em",
          zIndex: 1000,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          cursor: "pointer",
        }}
        className="flex items-center justify-center transition-all duration-300 hover:shadow-xl"
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
      </motion.button>

      {/* Enhanced Chatbot Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="fixed bottom-[1em] right-[.5em] w-[400px] h-[600px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl z-[1000] flex flex-col border border-white/20"
        >
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <i className="fa-regular fa-comment-dots text-white" />
              </div>
              <h2 className="text-white font-semibold text-lg">ChatGuru</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <i className="fa-solid fa-minimize text-white/80 text-sm" />
            </button>
          </div>

          {/* Predefined Questions */}
          <div className="p-4 flex gap-2 overflow-x-auto scrollbar-hide">
            {Object.keys(predefinedResponses).map((question) => (
              <motion.button
                key={question}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePredefinedMessage(question)}
                className="px-3 py-2 bg-white/10 text-purple-600 text-sm font-medium rounded-full border border-purple-100 hover:border-purple-200 hover:bg-purple-50 transition-colors whitespace-nowrap"
              >
                {question}
              </motion.button>
            ))}
          </div>

          {/* Chat Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.alignment === "right" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.alignment === "right"
                      ? "bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                      : message.alignment === "center"
                      ? "bg-gray-100 text-gray-600 text-center"
                      : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold">
                      {message.sender}
                    </span>
                    <span className="text-xs opacity-70">{message.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className="mt-1.5 flex justify-end">
                    <span className="text-[0.6rem] opacity-70">
                      {message.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Input Area */}
          <div className="p-4 pt-2 border-t border-gray-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(inputText)}
                placeholder="Ask me anything..."
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(inputText)}
                disabled={inputText.trim() === ""}
                className="absolute right-2 bg-gradient-to-br from-purple-600 to-blue-500 p-2 rounded-full shadow-sm disabled:opacity-50 disabled:pointer-events-none"
              >
                <FaForward className="text-white text-sm" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
