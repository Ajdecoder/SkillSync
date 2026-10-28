import InfoPage from "../../common/InfoPage";

const PrivacyPolicyPage = () => (
  <InfoPage
    title="Privacy Policy"
    intro="Your profile and account information help SkillSync provide candidate, recruiter, and opportunity features."
    sections={[
      {
        title: "Information in your account",
        text: "Profile details and information you choose to add are used to support the features available to you. Review your profile before publishing information that other users may see.",
      },
      {
        title: "Your choices",
        text: "Keep your account details current and use the profile and account settings available in SkillSync to review or update information.",
      },
      {
        title: "Questions about privacy",
        text: "This page is a general overview, not a complete statement of data-processing practices. Contact SkillSync with privacy questions or requests for more information.",
      },
    ]}
    action={{ label: "Contact Us", to: "/contact" }}
  />
);

export default PrivacyPolicyPage;
