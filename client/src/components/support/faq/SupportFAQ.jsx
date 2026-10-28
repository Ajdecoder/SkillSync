import InfoPage from "../../common/InfoPage";

const SupportFAQPage = () => (
  <InfoPage
    title="Support FAQ"
    intro="Answers to common account and platform support questions."
    sections={[
      {
        title: "I cannot access my account",
        text: "Use the password recovery option on the sign-in page. If you still cannot sign in, contact SkillSync and include the email address associated with your account.",
      },
      {
        title: "How do I update my profile?",
        text: "Sign in and open your profile settings to review and update the details shown to other users.",
      },
      {
        title: "Where do I report a problem?",
        text: "Use the Contact page to tell us what happened and which page or feature you were using.",
      },
    ]}
    action={{ label: "Contact Support", to: "/contact" }}
  />
);

export default SupportFAQPage;
