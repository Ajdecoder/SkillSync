import InfoPage from "../../common/InfoPage";

const OurPartnersPage = () => (
  <InfoPage
    title="Our Partners"
    intro="SkillSync brings professionals and employers together, and we welcome organizations that share our commitment to meaningful career connections."
    sections={[
      {
        title: "Work with SkillSync",
        text: "We are interested in partnerships that help candidates access opportunities and help employers connect with qualified talent.",
      },
      {
        title: "Start a conversation",
        text: "Tell us about your organization, the people you serve, and how you would like to collaborate. Our team can direct your inquiry to the right place.",
      },
    ]}
    action={{ label: "Get in Touch", to: "/contact" }}
  />
);

export default OurPartnersPage;
