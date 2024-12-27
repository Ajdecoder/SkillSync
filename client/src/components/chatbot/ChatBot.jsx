import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css";
import { PORT_CLIENT } from "../../commonClient";

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

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      sender: "You ",
      time: new Date().toLocaleTimeString(),
      text: inputText,
      status: "Sent ✔",
      alignment: "right",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");

    try {
      const response = await axios.post(
        `${PORT_CLIENT}/api/chatbot/chat-response`,
        { message: inputText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        id: messages.length + 2,
        sender: "ChatGuru",
        time: new Date().toLocaleTimeString(),
        text: response.data.res,
        status: "Delivered ✔",
        alignment: "left",
      };

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
          bottom: "1.1rem",
          right: "20px",
          zIndex: 1000,
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
        className="animate-pulse flex items-center justify-center hover:scale-110 transition-ease-in-out duration-200 hover:text-[1rem]"
      >
        {isOpen ? <i className="fa-solid fa-angle-down "></i> : "💬"}
      </button>

      {/* Chatbot UI */}
      {isOpen && (
  <div
    className={`fixed bottom-20 right-4 w-[25rem] bg-white rounded-lg shadow-lg z-[999] p-2
      transition-all duration-500 transform ${
        isOpen ? "chatbot-reveal" : "hidden"
      }`}
  >
    {/* Navbar */}
    <div className="flex items-center justify-between bg-blue-500 text-white p-2 rounded-t-lg">
      <span className="font-bold">ChatGuru</span>
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
              <span className="text-xs text-gray-700 dark:text-gray-400">{time}</span>
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
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        onClick={sendMessage}
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
