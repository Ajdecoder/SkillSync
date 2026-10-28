import InfoPage from "../../common/InfoPage";

const WarrantyInformationPage = () => (
  <InfoPage
    title="Warranty Information"
    intro="SkillSync provides online tools for professional profiles, opportunity discovery, and recruitment."
    sections={[
      {
        title: "Digital platform",
        text: "No physical products are sold through this page, so product warranty coverage does not apply to SkillSync platform access.",
      },
      {
        title: "Service support",
        text: "If a SkillSync feature is not working as expected, contact our team with the page, browser, and a description of the issue so we can help investigate.",
      },
    ]}
    action={{ label: "Contact Support", to: "/contact" }}
  />
);

export default WarrantyInformationPage;
