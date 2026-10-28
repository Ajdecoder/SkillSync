import InfoPage from "../../common/InfoPage";

const ContactUsPage = () => (
  <InfoPage
    title="Contact SkillSync Support"
    intro="We are here to help with questions about your account and the SkillSync platform."
    sections={[
      {
        title: "Tell us how we can help",
        text: "Describe the issue you are experiencing and include the page or feature involved. Do not send passwords or other sensitive account credentials.",
      },
      {
        title: "Need the contact form?",
        text: "Use the main Contact page to send a message to the SkillSync team.",
      },
    ]}
    action={{ label: "Go to Contact", to: "/contact" }}
  />
);

export default ContactUsPage;
