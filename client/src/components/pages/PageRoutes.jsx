// RoutesConfig.jsx
import { Route } from "react-router-dom";
import Home from "../home/Home";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import { LoginCandidate } from "../Login/LoginCandidate.jsx";
import { Register } from "../Register/ChooseRegisterMode.jsx";
import HireResources from "../Requirements/Recruiters/HireTalent.jsx";
import AddOpportunity from "../Requirements/Recruiters/AddOpportunity.jsx";
import { Resources } from "../Requirements/Resources.jsx";
import { RegCandidate } from "../Register/RegCandidate.jsx";
import { RegRecruiter } from "../Register/RegRecruiter.jsx";
import Blog from "../blog/Blog.jsx";
import { BlogPage } from "../blog/BlogPage.jsx";
import { Settings } from "../account/settings/Setting.jsx";
import { SavedOpportunity } from "../Requirements/Candidates/SavedOpportunity.jsx";
import MarketTrends from "../Requirements/MarketTrends.jsx";
import { BookmarkTalent } from "../Requirements/Recruiters/BookMarkTalent.jsx";
import OpportunityConnectPage from "../AddOpportunity/ConnectPage/OpportunityConnectPage.jsx";
import { UserProfile } from "../Userprofile/UserProfile.jsx";
import { LoginRecruiter } from "../Login/LoginRecruiter.jsx";
import { ChooseLoginMode } from "../Login/ChooseLoginMode.jsx";
import DeleteAccount from "../account/settings/DeleteAccount.jsx";
import {MyJobListings} from "../Requirements/Recruiters/MyJobListings.jsx";
import { ViewCandidateInfo } from "../TalentSearch/ViewCandidateProfile/ViewCandidateInfo.jsx";
import NotFoundPage from "../4NOT4/404.jsx";
import TalentsCard from "../Requirements/Recruiters/TalentSearchPage.jsx";
import NotificationPage from "../Notificationpage/Notificationpage.jsx";

// This is just a helper function to return route elements.

export const RoutesConfig = ({ spin, setSpin }) => [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="about" path="/about" element={<About />} />,
  <Route key="services" path="/services" element={<Services />} />,
  <Route
    key="blogs"
    path="/blogs"
    element={<Blog spin={spin} setSpin={setSpin} />}
  />,
  <Route key="pricing" path="/pricing" element={<Pricing />} />,
  <Route key="contact" path="/contact" element={<Contact />} />,
  <Route key="login" path="/login" element={<ChooseLoginMode />} />,
  <Route key="requirements" path="/requirements" element={<Resources />} />,
  <Route
    key="hire-talent"
    path="/requirements/hire-talent"
    element={<HireResources />}
  />,
  <Route
    key="listed-opportunity"
    path="/requirements/listed-opportunity"
    element={<MyJobListings />}
  />,
  <Route
    key="add-opportunity"
    path="/requirements/add-opportunity"
    element={<AddOpportunity />}
  />,
  <Route
    key="browse-opportunities"
    path="/requirements/browse-opportunities"
    element={<SavedOpportunity />}
  />,
  <Route
    key="bookmark-talent"
    path="/requirements/bookmark-talent"
    element={<BookmarkTalent />}
  />,
  <Route
    key="market-trends"
    path="/requirements/market-trends"
    element={<MarketTrends />}
  />,
  <Route
    key="connect-opportunity"
    path="opportunity/connect/:post_id"
    element={<OpportunityConnectPage />}
  />,
  <Route key="signup" path="/signup" element={<Register />} />,
  <Route
    key="signup-recruiter"
    path="/signup/recruiter"
    element={<RegRecruiter />}
  />,
  <Route
    key="signup-candidate"
    path="/signup/candidate"
    element={<RegCandidate />}
  />,
  <Route key="blog-page" path="/blog/:Blogid" element={<BlogPage />} />,
  <Route
    key="candidate-info"
    path="/candidateinfo/:candidateid"
    element={<ViewCandidateInfo />}
  />,
  <Route
    key="profile-settings"
    path="/profile/settings"
    element={<Settings />}
  />,
  <Route
    key="user-profile"
    path="/profile/userProfile"
    element={<UserProfile />}
  />,
  <Route
    key="login-recruiter"
    path="/login/recruiter"
    element={<LoginRecruiter />}
  />,
  <Route
    key="login-candidate"
    path="/login/candidate"
    element={<LoginCandidate />}
  />,
  <Route
    key="notifications"
    path="/notifications/"
    element={<NotificationPage />}
  />,
  <Route
    key="notifications"
    path="/notifications/:notificationId"
    element={<NotificationPage />}
  />,
  <Route key="delete-account" path="/settings/delete-account" element={<DeleteAccount />} />,
  <Route key="not-found" path="*" element={<NotFoundPage />} />,
];

