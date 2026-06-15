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

  return (
    <div className="dark:bg-gray-800 mx-auto p-10 border w-full faq">
      <h2 className="mb-8 font-extrabold text-blue-700 text-3xl text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={activeIndex === index}
            onclick={() => setActiveIndex((prev) => (prev === index ? null : index))}
          />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer, isOpen, onclick }) => {
  return (
    <div
      onClick={onclick}
      className={`border border-gray-300 rounded-lg shadow-md transition-all duration-300 ${isOpen ? "bg-blue-50 dark:bg-zinc-900" : "bg-white dark:bg-zinc-800"
        }`}
    >
      {/* Question */}
      <div className="flex justify-between items-center p-4 cursor-pointer">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
          {question}
        </h3>

        <i
          className={`fa-solid fa-chevron-down text-blue-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        ></i>
      </div>

      {/* Answer */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen
            ? "max-h-40 opacity-100 translate-y-0 p-4 pt-0"
            : "max-h-0 opacity-0 -translate-y-2"
          }`}
      >
        <p className="text-gray-700 dark:text-gray-300">
          {answer}
        </p>
      </div>
    </div>
  );
};


export default FAQ;
