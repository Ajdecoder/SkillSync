import InfoPage from "../../common/InfoPage";

const NewsletterPage = () => (
  <InfoPage
    title="SkillSync Newsletter"
    intro="Get occasional SkillSync news, career resources, and platform updates."
    sections={[
      {
        title: "What to expect",
        text: "Newsletter updates may include practical job-search guidance, recruiting insights, and news about the SkillSync platform.",
      },
      {
        title: "Subscribe",
        text: "Contact the SkillSync team to ask about newsletter subscriptions. We do not collect your email through this page until a subscription service is available.",
      },
    ]}
    action={{ label: "Contact Us", to: "/contact" }}
  />
);

export default NewsletterPage;
