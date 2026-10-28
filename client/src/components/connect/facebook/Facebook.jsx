import InfoPage from "../../common/InfoPage";

const FacebookPage = () => (
  <InfoPage
    title="Connect with SkillSync"
    intro="Find SkillSync news and community updates through our official social channels."
    sections={[
      {
        title: "Follow official updates",
        text: "When looking for SkillSync on Facebook, use a profile linked from an official SkillSync source to make sure you are following the right page.",
      },
      {
        title: "Get help",
        text: "For account or platform questions, contact our team directly through the Contact page.",
      },
    ]}
    action={{ label: "Contact Us", to: "/contact" }}
  />
);

export default FacebookPage;
