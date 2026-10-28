import InfoPage from "../../common/InfoPage";

const TermsOfServicePage = () => (
  <InfoPage
    title="Terms of Service"
    intro="These guidelines describe responsible use of SkillSync. Review any terms presented during account creation or when using a specific service."
    sections={[
      {
        title: "Use the platform responsibly",
        text: "Provide accurate information, protect your account credentials, and use SkillSync for legitimate professional networking, job search, and recruitment.",
      },
      {
        title: "Respect other users",
        text: "Keep communications professional and do not post misleading, unlawful, or harmful content. Candidates and employers are responsible for evaluating opportunities and making their own arrangements.",
      },
      {
        title: "Questions about these guidelines",
        text: "This overview is not a substitute for complete legal terms. Contact SkillSync if you need clarification about platform use.",
      },
    ]}
    action={{ label: "Contact Us", to: "/contact" }}
  />
);

export default TermsOfServicePage;
