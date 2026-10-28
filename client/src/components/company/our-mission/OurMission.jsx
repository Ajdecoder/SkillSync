import InfoPage from "../../common/InfoPage";

const OurMissionPage = () => (
  <InfoPage
    title="Our Mission"
    intro="SkillSync exists to make it easier for talented people and trusted companies to find the right professional match."
    sections={[
      {
        title: "Better connections",
        text: "We bring candidate profiles, skills, and job opportunities together so people can discover relevant possibilities and employers can find talent.",
      },
      {
        title: "A more useful job search",
        text: "Our goal is to help candidates present their experience clearly and give recruiters tools to manage opportunities and explore talent.",
      },
    ]}
    action={{ label: "Discover SkillSync", to: "/" }}
  />
);

export default OurMissionPage;
