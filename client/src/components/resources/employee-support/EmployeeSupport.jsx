import InfoPage from "../../common/InfoPage";

const EmployeeSupportPage = () => (
  <InfoPage
    title="Employee Support"
    intro="Find help with your SkillSync profile, job search, or recruiting workflow."
    sections={[
      {
        title: "Candidate support",
        text: "Keep your profile and resume up to date, check your saved opportunities, and review your account settings when you need to make changes.",
      },
      {
        title: "Recruiter support",
        text: "Review your listings and talent search details to make sure your opportunities and company information are accurate.",
      },
      {
        title: "Get in touch",
        text: "If you cannot resolve an issue using the available account tools, send the SkillSync team a message through the Contact page.",
      },
    ]}
    action={{ label: "Contact Us", to: "/contact" }}
  />
);

export default EmployeeSupportPage;
