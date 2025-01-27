import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css";
import { PORT_CLIENT } from "../../commonClient";
import { getChatResponse } from "../../services/api";

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

    try {
      const response = await getChatResponse({ text: message });
      const botMessage = {
        id: messages.length + 2,
        sender: "ChatGuru",
        time: new Date().toLocaleTimeString(),
        text: response.data.res,
        status: "Delivered ✔",
        alignment: "left",
      };

      setInputText("");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response from Gemini:", error);

      const errorMessage = {
        id: messages.length + 2,
        sender: "ChatGuru",
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
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "0em",
          right: "20px",
          zIndex: 1000,
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
        className=" chatbot-toogle-btn animate-bounce flex items-center justify-center hover:scale-10 transition-ease-in-out duration-200 hover:text-[1rem] bg-[#007bff] hover:bg-black "
      >
        {isOpen ? <i className="fa-solid fa-angle-down "></i> : "💬"}
      </button>

      {/* Chatbot UI */}
      {isOpen && (
        <div
          className={`chatbot-window fixed bottom-[0.1rem] right-4 w-[25rem] bg-white rounded-lg shadow-lg z-[1000] p-2
      transition-all duration-500 transform ${
        isOpen ? "chatbot-reveal" : "hidden"
      }`}
        >
          {/* Navbar */}
          <div className="flex items-center justify-between bg-blue-500 text-white p-4 rounded-t-lg">
            <span className="font-bold">ChatGuru</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <i className="fa-solid fa-window-minimize"></i>
            </button>
          </div>

          {/* Predefined Buttons */}
          <div className="text-black flex gap-3 p-3 text-[12px]">
            <button
              className="border-2 border-violet-600"
              onClick={() => handlePredefinedMessage("What is SkillSync?")}
            >
              What is SkillSync?
            </button>
            <button
              className="border-2 border-violet-600"
              onClick={() => handlePredefinedMessage("How to post a job?")}
            >
              How to post a job?
            </button>
            <button
              className="border-2 border-violet-600"
              onClick={() =>
                handlePredefinedMessage("How to update my profile?")
              }
            >
              How to update my profile?
            </button>
          </div>

          {/* Chat Messages */}
          <div className="chatbot-container p-4 max-h-[400px] overflow-y-auto">
            {messages.map(({ id, sender, time, text, status, alignment }) => (
              <div
                key={id}
                className={`flex mb-4 ${
                  alignment === "right"
                    ? "justify-end items-end"
                    : alignment === "center"
                    ? "justify-center items-center "
                    : "justify-start items-start"
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`message-bubble break-words whitespace-pre-wrap p-3 max-w-[70%]
              ${
                alignment === "right"
                  ? "bg-slate-300 text-black self-end rounded-tl-lg rounded-bl-lg"
                  : alignment === "center"
                  ? "bg-white text-black rounded-xl"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tr-lg rounded-br-lg"
              }`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{sender}</span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      {time}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{text}</p>
                  <span className="mt-1 text-xs text-gray-800">{status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex gap-2 mt-2 p-2 w-full items-center">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-900 dark:text-white dark:border-gray-600
          focus:ring-2 focus:ring-blue-400"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(inputText)}
            />
            <button
              onClick={() => sendMessage(inputText)}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg transform transition-transform duration-300
          hover:scale-105 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
              disabled={inputText.trim() === ""}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};
