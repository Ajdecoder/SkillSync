import React, { useEffect, useState } from "react";
import { getChatResponse, getUserProfileByEmail } from "../../services/api";
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { useAuth } from "../context/AuthContext";

export const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ChatGuru",
      time: "11:46",
      text: "Hello User",
      alignment: "center",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [chat, setChat] = useState(false);

  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;
  const lenis = useLenis();

  const predefinedResponses = {
    "What is SkillSync?":
      "SkillSync connects businesses with skilled professionals for flexible work opportunities.",
    "How to post a job?":
      "To post a job, go to the 'Add Opportunity' page and fill in the details.",
    "How to update my profile?":
      "Go to your dashboard, click on 'Edit Profile', and make changes.",
    "How do I apply for a job?":
      "Find a job that matches your skills on the Talent Search page and click 'Apply'.",
    "Is SkillSync free to use?":
      "Yes, SkillSync is free for professionals. Employers may have premium features for enhanced hiring options.",
    "How does SkillSync ensure job authenticity?":
      "We verify employers and job postings to minimize fraudulent activities.",
    "How do I report a suspicious job post?":
      "Click on the 'Report' button next to the job posting and provide details about the issue.",
    "Does SkillSync offer customer support?":
      "Yes, you can reach out to our support team via the 'Contact Us' page.",
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser?.email) return;
      const email = currentUser.email;
      const profile = await getUserProfileByEmail(email);
      setUserId(profile?.data?.candidateProfile?._id);
    };
    fetchUserProfile();
  }, [currentUser]);

  useEffect(() => {
    const chatContainer = document.querySelector(".chatbot-container");
    const handleMouseEnter = () => lenis?.stop();
    const handleMouseLeave = () => lenis?.start();
    const handleWheel = (event) => event.stopPropagation();

    if (chatContainer) {
      chatContainer.addEventListener("mouseenter", handleMouseEnter);
      chatContainer.addEventListener("mouseleave", handleMouseLeave);
      chatContainer.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      chatContainer?.removeEventListener("mouseenter", handleMouseEnter);
      chatContainer?.removeEventListener("mouseleave", handleMouseLeave);
      chatContainer?.removeEventListener("wheel", handleWheel);
    };
  }, [lenis]);

  const handlePredefinedMessage = (message) => {
    setInputText(message);

    const userMessage = {
      id: messages.length + 1,
      sender: "You",
      time: new Date().toLocaleTimeString(),
      text: message,
      status: "Sent ✔",
      alignment: "right",
    };

    setMessages((prev) => [...prev, userMessage]);
    const predefinedAnswer = predefinedResponses[message];

    if (predefinedAnswer) {
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          sender: "ChatGuru",
          time: new Date().toLocaleTimeString(),
          text: predefinedAnswer,
          alignment: "left",
        };
        setInputText("");
        setMessages((prev) => [...prev, botMessage]);
        setChat(true);
      }, 1000);
    } else {
      sendMessage(message);
      setChat(true);
    }
  };

  const sendMessage = async (message) => {
    if (message.trim() === "") return;
    setChat(true);
    setInputText("");

    const userMessage = {
      id: messages.length + 1,
      sender: "You",
      time: new Date().toLocaleTimeString(),
      text: message,
      status: "Sent ✔",
      alignment: "right",
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await getChatResponse({ text: message, id: userId });
      const fullText = response.data.response;
      console.log("fullText:", fullText);
      const words = fullText.split(" ");
      const botMessage = {
        id: messages.length + 2,
        sender: "ChatGuru",
        time: new Date().toLocaleTimeString(),
        text: "",
        status: "Typing...",
        alignment: "left",
      };

      setMessages((prev) => [...prev, botMessage]);

      words.forEach((word, index) => {
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessage.id
                ? {
                    ...msg,
                    text: msg.text + " " + word,
                    status: "Delivered ✔",
                  }
                : msg
            )
          );
        }, index * 88);
      });
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg = {
        id: messages.length + 2,
        sender: "ChatGuru",
        time: new Date().toLocaleTimeString(),
        text: "Sorry, something went wrong. Please try again.",
        status: "Error",
        alignment: "left",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg hover:shadow-xl"
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

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="chatbot-container fixed bottom-[1em] right-[.5em] w-[400px] h-[600px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl z-[1000] flex flex-col border border-white/20"
        >
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

          {!chat ? (
            <div className="p-4 grid grid-cols-2 gap-3">
              {Object.keys(predefinedResponses).map((question,i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePredefinedMessage(question)}
                  className="min-w-full p-4 bg-white text-left rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 text-purple-600">
                      <i className="fa-regular fa-comment-dots text-sm" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 hover:text-purple-800">
                      {question}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
              {messages.map((message,i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.alignment === "right"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                      message.alignment === "right"
                        ? "bg-blue-100"
                        : "bg-purple-100"
                    }`}
                  >
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <div className="text-[10px] text-gray-400 text-right mt-1">
                      {message.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="p-3 border-t bg-white rounded-b-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePredefinedMessage(inputText);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-700"
              >
                Send
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};
