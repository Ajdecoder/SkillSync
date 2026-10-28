import InfoPage from "../../common/InfoPage";

const LinkedInPage = () => (
  <InfoPage
    title="Connect on LinkedIn"
    intro="Follow SkillSync updates and join conversations about careers, professional growth, and hiring."
    sections={[
      {
        title: "Stay connected",
        text: "Visit SkillSync's official LinkedIn presence to see company updates and professional community news. Use a verified SkillSync profile when searching LinkedIn to avoid unofficial accounts.",
      },
      {
        title: "Looking for opportunities?",
        text: "You can also explore candidate and recruiter features directly on the SkillSync platform.",
      },
    ]}
    action={{ label: "Explore SkillSync", to: "/" }}
  />
);

export default LinkedInPage;
