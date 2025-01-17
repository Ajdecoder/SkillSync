// RoutesConfig.jsx
import { Route } from "react-router-dom";
import Home from "../home/Home";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import { LoginCandidate } from "../Login/LoginCandidate.jsx";
import { Register } from "../Register/ChooseRegisterMode.jsx";
import HireResources from "../Resources/HireTalent.jsx";
import AddOpportunity from "../Resources/AddOpportunity.jsx";
import { Resources } from "../Resources/Resources.jsx";
import { RegCandidate } from "../Register/RegCandidate.jsx";
import { RegRecruiter } from "../Register/RegRecruiter.jsx";
import Blog from "../blog/Blog.jsx";
import { BlogPage } from "../blog/BlogPage.jsx";
import { Settings } from "../account/settings/Setting.jsx";
import { SavedSearches } from "../Resources/SavedSearch.jsx";
import { SavedOpportunity } from "../Resources/SavedOpportunity.jsx";
import MarketTrends from "../Resources/MarketTrends.jsx";
import { BookmarkTalent } from "../Resources/BookMarkTalent.jsx";
import TalentConnectPage from "../ConnectPage/HiringConnectPage.jsx";
import OpportunityConnectPage from "../ConnectPage/OpportunityConnectPage.jsx";
import { UserProfile } from "../Userprofile/UserProfile.jsx";
import { LoginRecruiter } from "../Login/LoginRecruiter.jsx";
import { ChooseLoginMode } from "../Login/ChooseLoginMode.jsx";
import DeleteAccount from "../account/settings/DeleteAccount.jsx";
import { ListedOpportunities } from "../Resources/ListedOpportunities.jsx";

// This is just a helper function to return route elements.

export const RoutesConfig = ({ spin, setSpin }) => [
  <Route key="/" path="/" element={<Home />} />,
  <Route key="/about" path="/about" element={<About />} />,
  <Route key="/services" path="/services" element={<Services />} />,
  <Route
    key="/blogs"
    path="/blogs"
    element={<Blog spin={spin} setSpin={setSpin} />}
  />,
  <Route key="/pricing" path="/pricing" element={<Pricing />} />,
  <Route key="/contact" path="/contact" element={<Contact />} />,
  <Route key="/login" path="/login" element={<ChooseLoginMode />} />,
  <Route key="/requirements" path="/requirements" element={<Resources />} />,
  <Route
    key="/requirements/hire-talent"
    path="/requirements/hire-talent"
    element={<HireResources />}
  />,
  <Route
    key="/requirements/listed-opportunity"
    path="/requirements/listed-opportunity"
    element={<ListedOpportunities />}
  />,
  <Route
    key="/requirements/add-opportunity"
    path="/requirements/add-opportunity"
    element={<AddOpportunity />}
  />,
  <Route
    key="/requirements/saved-searches"
    path="/requirements/saved-searches"
    element={<SavedSearches />}
  />,
  <Route
    key="/requirements/saved-opportunities"
    path="/requirements/saved-opportunities"
    element={<SavedOpportunity />}
  />,
  <Route
    key="/requirements/bookmark-talent"
    path="/requirements/bookmark-talent"
    element={<BookmarkTalent />}
  />,
  <Route
    key="/requirements/market-trends"
    path="/requirements/market-trends"
    element={<MarketTrends />}
  />,
  <Route
    key="talent/connect/:post_id"
    path="talent/connect/:post_id"
    element={<TalentConnectPage />}
  />,
  <Route
    key="opportunity/connect/:post_id"
    path="opportunity/connect/:post_id"
    element={<OpportunityConnectPage />}
  />,
  <Route key="/signup" path="/signup" element={<Register />} />,
  <Route
    key="/signup/recruiter"
    path="/signup/recruiter"
    element={<RegRecruiter />}
  />,
  <Route
    key="/signup/candidate"
    path="/signup/candidate"
    element={<RegCandidate />}
  />,
  <Route key="/blog/:Blogid" path="/blog/:Blogid" element={<BlogPage />} />,
  <Route
    key="/profile/settings"
    path="/profile/settings"
    element={<Settings />}
  />,
  <Route
    key="/profile/settings"
    path="/profile/userProfile"
    element={<UserProfile />}
  />,
  <Route
    key="/login/recruiter"
    path="/login/recruiter"
    element={<LoginRecruiter />}
  />,
  <Route
    key="/login/candidate"
    path="/login/candidate"
    element={<LoginCandidate />}
  />,
  <Route
    key="/settings/delete-account"
    path="/settings/delete-account"
    element={<DeleteAccount />}
  />,
];
