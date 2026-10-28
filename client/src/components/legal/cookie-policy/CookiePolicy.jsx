import InfoPage from "../../common/InfoPage";

const CookiePolicyPage = () => (
  <InfoPage
    title="Cookie Policy"
    intro="Web technologies such as cookies or local storage may be used to support essential site and account functionality."
    sections={[
      {
        title: "Why these technologies are used",
        text: "They can help a website remember settings, maintain an account session, and provide core features. Available behavior may depend on the browser and the features you use.",
      },
      {
        title: "Manage browser storage",
        text: "Most browsers let you review or clear cookies and site data. Restricting storage may affect sign-in or other parts of the site.",
      },
      {
        title: "Questions",
        text: "This is a general overview and not a complete inventory of technologies used by the platform. Contact SkillSync if you need more information.",
      },
    ]}
    action={{ label: "Contact Us", to: "/contact" }}
  />
);

export default CookiePolicyPage;
