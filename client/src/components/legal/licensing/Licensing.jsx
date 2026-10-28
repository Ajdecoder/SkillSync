import InfoPage from "../../common/InfoPage";

const LicensingPage = () => (
  <InfoPage
    title="Licensing"
    intro="Please respect the rights in SkillSync platform materials and user-submitted content."
    sections={[
      {
        title: "Platform materials",
        text: "Unless a separate license says otherwise, SkillSync branding, design, and original platform materials may not be copied, redistributed, or used commercially without permission.",
      },
      {
        title: "User-submitted content",
        text: "Users remain responsible for content they submit and must have the rights needed to share it. Contact SkillSync if you have a question about permitted use.",
      },
    ]}
    action={{ label: "Contact Us", to: "/contact" }}
  />
);

export default LicensingPage;
