import InfoPage from "../../common/InfoPage";

const ShippingReturnsPage = () => (
  <InfoPage
    title="Shipping & Returns"
    intro="SkillSync is a digital platform for professional profiles and opportunities."
    sections={[
      {
        title: "Digital services",
        text: "SkillSync does not ship physical goods through this website, so product shipping and merchandise returns are not currently applicable.",
      },
      {
        title: "Account or service questions",
        text: "For questions about your account or a SkillSync service, contact our team and describe the issue you are experiencing.",
      },
    ]}
    action={{ label: "Contact Us", to: "/contact" }}
  />
);

export default ShippingReturnsPage;
