import InfoPage from "../../common/InfoPage";

const PressReleasesPage = () => (
  <InfoPage
    title="Press Releases"
    intro="Updates and announcements about SkillSync will be shared here."
    sections={[
      {
        title: "Company news",
        text: "There are no press releases to display at this time. For company information or media inquiries, please contact the SkillSync team.",
      },
      {
        title: "Media inquiries",
        text: "Include your publication, deadline, and the subject of your request so we can respond to your inquiry.",
      },
    ]}
    action={{ label: "Contact Us", to: "/contact" }}
  />
);

export default PressReleasesPage;
