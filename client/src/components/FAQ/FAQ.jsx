import React, { useState } from "react";

const FAQ = () => {
    const faqs = [
        {
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking the 'Sign Up' button on the homepage and filling out the required details.",
        },
        {
          question: "Is SkillSync free to use?",
          answer:
            "Yes, SkillSync offers free access to its basic features. Premium features may require a subscription.",
        },
        {
          question: "How does SkillSync recommend opportunities?",
          answer:
            "SkillSync uses advanced algorithms to match your skills and preferences with the best opportunities available.",
        },
        {
          question: "Can I update my profile after registration?",
          answer:
            "Yes, you can update your profile anytime by visiting your dashboard and clicking on the 'Edit Profile' button.",
        },
        {
          question: "What kind of opportunities does SkillSync provide?",
          answer:
            "SkillSync connects users with opportunities like full-time jobs, freelance projects, internships, and skill-based collaborations.",
        },
        {
          question: "How secure is my personal information on SkillSync?",
          answer:
            "We prioritize your privacy and security. All data is encrypted, and we adhere to strict privacy policies.",
        },
        {
          question: "Does SkillSync support multiple languages?",
          answer:
            "Currently, SkillSync supports English. We plan to include more languages in future updates.",
        },
        {
          question: "Can companies post job opportunities on SkillSync?",
          answer:
            "Yes, companies can register on SkillSync and post job opportunities to find the best talent.",
        },
        {
          question: "How can I delete my SkillSync account?",
          answer:
            "To delete your account, please visit the settings page and follow the instructions under 'Account Management'.",
        },
        {
          question: "Does SkillSync offer premium subscriptions?",
          answer:
            "Yes, SkillSync offers premium subscriptions with additional features like advanced analytics, personalized recommendations, and more.",
        },
      ];
      

  const [activeIndex, setActiveIndex] = useState(null); 

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index); 
  };

  return (
    <div className="faq mx-auto p-10 dark:bg-gray-800 w-full h-[67rem] border">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-700 mt-7">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={activeIndex === index}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div
      className={`border border-gray-300 rounded-lg shadow-md transition-all ${
        isOpen ? "bg-blue-50" : "bg-white"
      }`}
    >
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={onClick}
      >
        <h3 className="font-semibold text-lg">{question}</h3>
        <button
          className="text-blue-600 focus:outline-none p-2 hover:bg-green-600 duration-500 ease-in-out "
          aria-label="Toggle FAQ"
        >
          {isOpen ? (
            <i className="fa-solid fa-chevron-up hover"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
        </button>
      </div>
      <div
        className={`overflow-hidden duration-300 ease-in-out ${
          isOpen ? "max-h-screen p-4" : "max-h-0"
        }`}
      >
        <p className="text-gray-700">{answer}</p>
      </div>
    </div>
  );
};

export default FAQ;
