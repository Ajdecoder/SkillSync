import InfoPage from "../../common/InfoPage";

const ContractManagementPage = () => (
  <InfoPage
    title="Contract Management"
    intro="Keep the details of your hiring relationships clear and organized as you connect with talent through SkillSync."
    sections={[
      {
        title: "Keep agreements clear",
        text: "Discuss responsibilities, compensation, timelines, and deliverables before work begins. Make sure all parties understand and retain a copy of the final agreement.",
      },
      {
        title: "Manage hiring conversations",
        text: "Use your recruiter and candidate profiles to identify the right contacts and keep opportunity details current. SkillSync helps people connect; agreements are made directly between the parties.",
      },
      {
        title: "Need assistance?",
        text: "For help using the platform, contact our support team. For legal advice about a contract, consult a qualified professional.",
      },
    ]}
    action={{ label: "Contact Support", to: "/contact" }}
  />
);

export default ContractManagementPage;
