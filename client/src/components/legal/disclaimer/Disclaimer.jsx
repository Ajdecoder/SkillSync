import InfoPage from "../../common/InfoPage";

const DisclaimerPage = () => (
  <InfoPage
    title="Disclaimer"
    intro="SkillSync provides tools to help candidates and employers discover and discuss professional opportunities."
    sections={[
      {
        title: "Information on the platform",
        text: "Profiles, listings, and other user-submitted information are provided by their respective users. Review details independently and confirm important information directly with the relevant person or organization.",
      },
      {
        title: "Independent decisions",
        text: "SkillSync helps users connect but does not make hiring decisions or guarantee employment, candidate suitability, or the outcome of an agreement between users.",
      },
      {
        title: "Not professional advice",
        text: "Platform content is general information and is not legal, financial, or career advice tailored to your circumstances.",
      },
    ]}
  />
);

export default DisclaimerPage;
