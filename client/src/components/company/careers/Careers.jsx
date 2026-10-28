import InfoPage from "../../common/InfoPage";

const CareersPage = () => (
  <InfoPage
    title="Careers at SkillSync"
    intro="Help us build better ways for people and companies to find each other."
    sections={[
      {
        title: "Build with purpose",
        text: "SkillSync is focused on making professional discovery and hiring more accessible and useful for candidates and recruiters.",
      },
      {
        title: "Interested in joining us?",
        text: "Share a little about your background and the kind of work you would like to do with our team. Contact us to start a conversation about future opportunities.",
      },
    ]}
    action={{ label: "Contact Us", to: "/contact" }}
  />
);

export default CareersPage;
