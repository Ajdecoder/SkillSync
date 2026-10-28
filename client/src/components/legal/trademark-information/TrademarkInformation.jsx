import InfoPage from "../../common/InfoPage";

const TrademarkInformationPage = () => (
  <InfoPage
    title="Trademark Information"
    intro="SkillSync names, logos, and visual identity help users identify our services."
    sections={[
      {
        title: "Use of SkillSync marks",
        text: "Do not use SkillSync branding in a way that suggests endorsement, affiliation, or sponsorship without prior written permission.",
      },
      {
        title: "Report a concern",
        text: "If you believe a mark is being used in a misleading or unauthorized way, contact SkillSync with details about the use.",
      },
    ]}
    action={{ label: "Contact Us", to: "/contact" }}
  />
);

export default TrademarkInformationPage;
