import InfoPage from "../../common/InfoPage";

const FAQsPage = () => (
  <InfoPage
    title="Frequently Asked Questions"
    intro="Quick answers to common questions about finding opportunities, presenting your experience, and connecting with employers on SkillSync."
    sections={[
      {
        title: "How do I get started?",
        text: "Create a candidate account to build your profile and explore opportunities, or register as a recruiter to share openings and discover talent.",
      },
      {
        title: "How can I keep track of opportunities?",
        text: "Use the opportunity browsing and bookmarking tools in your account to save roles you want to revisit.",
      },
      {
        title: "Where can I get help?",
        text: "If you need assistance with your account or the platform, visit our Employee Support page or contact the SkillSync team.",
      },
    ]}
    action={{ label: "Explore SkillSync", to: "/" }}
  />
);

export default FAQsPage;