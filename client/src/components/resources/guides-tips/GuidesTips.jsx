import InfoPage from "../../common/InfoPage";

const GuidesTipsPage = () => (
  <InfoPage
    title="Guides & Tips"
    intro="Practical ways to make the most of SkillSync as you search for your next opportunity or build a strong team."
    sections={[
      {
        title: "Make your profile work for you",
        text: "Add relevant skills, experience, and a current resume so employers can understand your strengths at a glance.",
      },
      {
        title: "Search with purpose",
        text: "Use the available search and filters to focus on roles that match your goals. Save promising opportunities so you can return to them later.",
      },
      {
        title: "Recruit with clarity",
        text: "Write specific opportunity descriptions, outline the skills you need, and keep your listings accurate and up to date.",
      },
    ]}
    action={{ label: "Browse Opportunities", to: "/requirements/browse-opportunities" }}
  />
);

export default GuidesTipsPage;
