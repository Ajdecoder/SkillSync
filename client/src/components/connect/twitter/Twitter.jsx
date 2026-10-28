import InfoPage from "../../common/InfoPage";

const TwitterPage = () => (
  <InfoPage
    title="Follow SkillSync"
    intro="Keep up with SkillSync announcements and conversations about careers and professional connections."
    sections={[
      {
        title: "Find official updates",
        text: "Use the official SkillSync social profile to follow product news and community updates. Check that the account is verified or linked from an official SkillSync source.",
      },
      {
        title: "Explore the platform",
        text: "Browse opportunities, build your profile, or learn more about SkillSync from the main site.",
      },
    ]}
    action={{ label: "Explore SkillSync", to: "/" }}
  />
);

export default TwitterPage;
