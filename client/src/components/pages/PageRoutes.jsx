// RoutesConfig.jsx
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Public Pages
import Home from "../home/Home";
import About from "../about/About";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog.jsx";
import { BlogPage } from "../blog/BlogPage.jsx";
import NotFoundPage from "../4NOT4/404.jsx";

// Authentication
import { ChooseLoginMode } from "../Login/ChooseLoginMode.jsx";
import { LoginCandidate } from "../Login/LoginCandidate.jsx";
import { LoginRecruiter } from "../Login/LoginRecruiter.jsx";
import { Register } from "../Register/ChooseRegisterMode.jsx";
import { RegCandidate } from "../Register/RegCandidate.jsx";
import { RegRecruiter } from "../Register/RegRecruiter.jsx";

// Candidate Pages
import { SavedOpportunity } from "../Requirements/Candidates/SavedOpportunity.jsx";
import { AllBookmarks } from "../Requirements/Candidates/AllBookmarks.jsx";

// Recruiter Pages
import HireResources from "../Requirements/Recruiters/HireTalent.jsx";
import AddOpportunity from "../Requirements/Recruiters/AddOpportunity.jsx";
import TalentPool from "../Requirements/Recruiters/TalentPool.jsx";
import { ListedListenings } from "../Requirements/Recruiters/JobListings/ListedListenings.jsx";
import { MyJobListings } from "../Requirements/Recruiters/MyJobListings.jsx";
import { ListedTalents } from "../Requirements/Recruiters/ListedTalents.jsx";

// Shared/General
import { Resources } from "../Requirements/Resources.jsx";
import MarketTrends from "../Requirements/MarketTrends.jsx";
import OpportunityConnectPage from "../AddOpportunity/ConnectPage/OpportunityConnectPage.jsx";
import { ViewCandidateInfo } from "../TalentSearch/ViewCandidateProfile/ViewCandidateInfo.jsx";
import { Settings } from "../account/settings/Setting.jsx";
import DeleteAccount from "../account/settings/DeleteAccount.jsx";
import { UserProfile } from "../Userprofile/UserProfile.jsx";
import NotificationPage from "../Notificationpage/Notificationpage.jsx";
import { LoginPromoPage } from "../Login/NotLoggedIn.jsx";
import ResumeBuilder from "../ResumeBuilder/ResumeBuilder.jsx";
import ChangePassword from "../account/settings/ChangePass.jsx";
import ChangeEmail from "../account/settings/ChangeEmail.jsx";
import ForgotPassword from "../forgotPassword/forgotPassword.jsx";
import ResetPassword from "../forgotPassword/resetPassword.jsx";

// Prevent already logged-in users from accessing login/signup
const PreventLoggedIn = ({ children }) => {
  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;
  return currentUser ? <Navigate to="/" replace /> : children;
};

// Role-based access protection
const RequireRole = ({ role, children }) => {
  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;
  if (currentUser?.role !== role) {
    return <LoginPromoPage />;
  }
  return children;
};

// Main Config
export const RoutesConfig = () => [
  // Public Routes
  <Route key="home" path="/" element={<Home />} />,
  <Route key="about" path="/about" element={<About />} />,
  <Route key="services" path="/services" element={<Services />} />,
  <Route key="contact" path="/contact" element={<Contact />} />,
  <Route key="pricing" path="/pricing" element={<Pricing />} />,
  <Route
    key="blogs"
    path="/blogs"
    element={<Blog />}
  />,
  <Route key="blog-page" path="/blog/:Blogid" element={<BlogPage />} />,
  <Route key="requirements" path="/requirements" element={<Resources />} />,

  <Route
    key="market-trends"
    path="/requirements/market-trends"
    element={<MarketTrends />}
  />,
  <Route
    key="connect-opportunity"
    path="/opportunity/connect/:post_id"
    element={<OpportunityConnectPage />}
  />,
  <Route
    key="candidate-info"
    path="/candidateinfo/:candidateId"
    element={<ViewCandidateInfo />}
  />,
  <Route key="not-found" path="*" element={<NotFoundPage />} />,

  // Auth Routes (Prevent access if already logged in)
  <Route
    key="login"
    path="/login"
    element={
      <PreventLoggedIn>
        <ChooseLoginMode />
      </PreventLoggedIn>
    }
  />,
  <Route
    key="login-candidate"
    path="/login/candidate"
    element={
      <PreventLoggedIn>
        <LoginCandidate />
      </PreventLoggedIn>
    }
  />,
  <Route
    key="login-recruiter"
    path="/login/recruiter"
    element={
      <PreventLoggedIn>
        <LoginRecruiter />
      </PreventLoggedIn>
    }
  />,
  <Route
    key="signup"
    path="/signup"
    element={
      <PreventLoggedIn>
        <Register />
      </PreventLoggedIn>
    }
  />,
  <Route
    key="signup-candidate"
    path="/signup/candidate"
    element={
      <PreventLoggedIn>
        <RegCandidate />
      </PreventLoggedIn>
    }
  />,
  <Route
    key="signup-recruiter"
    path="/signup/recruiter"
    element={
      <PreventLoggedIn>
        <RegRecruiter />
      </PreventLoggedIn>
    }
  />,

  // Candidate Protected Routes
  <Route
    key="candidate-opportunities"
    path="/requirements/browse-opportunities"
    element={
      <RequireRole role="candidate">
        <SavedOpportunity />
      </RequireRole>
    }
  />,
  <Route
    key="candidate-bookmarks"
    path="/requirements/bookmarked-jobs"
    element={
      <RequireRole role="candidate">
        <AllBookmarks />
      </RequireRole>
    }
  />,

  <Route
    key="resume-builder"
    path="requirements/resume-builder"
    element={
      <RequireRole role="candidate">
        <ResumeBuilder />
      </RequireRole>
    }
  />,

  // Recruiter Protected Routes
  <Route
    key="hire-talent"
    path="/requirements/hire-talent"
    element={
      <RequireRole role="recruiter">
        <HireResources />
      </RequireRole>
    }
  />,
  <Route
    key="add-opportunity"
    path="/requirements/add-opportunity"
    element={
      <RequireRole role="recruiter">
        <AddOpportunity />
      </RequireRole>
    }
  />,
  <Route
    key="listed-opportunity"
    path="/requirements/listed-opportunity"
    element={
      <RequireRole role="recruiter">
        <ListedListenings />
      </RequireRole>
    }
  />,
  <Route
    key="talent-pool"
    path="/requirements/talent-pool"
    element={
      <RequireRole role="recruiter">
        <ListedTalents />
      </RequireRole>
    }
  />,
  <Route
    key="settings/delete-account"
    path="/settings/delete-account"
    element={<DeleteAccount />}
  />,
  // Shared Protected Routes (Accessible to both roles)
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
    key="change-password"
    path="/profile/settings/change-password"
    element={<ChangePassword />}
  />,
  <Route
    key="change-email"
    path="/profile/settings/change-email"
    element={<ChangeEmail />}
  />,
  <Route
    key="notifications"
    path="/notifications"
    element={<NotificationPage />}
  />,
  <Route
    key="notification-details"
    path="/notifications/:notificationId"
    element={<NotificationPage />}
  />,
  <Route
    key="forgot-password"
    path="/forgot-password"
    element={<ForgotPassword />}
  />,
  <Route
    key="reset-password"
    path="/reset-password"
    element={<ResetPassword />}
  />,
];
