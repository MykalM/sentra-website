import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home";
import { SolutionsPage } from "./pages/solutions";
import { PlatformPage } from "./pages/platform";
import { ResourcesPage } from "./pages/resources";
import { AboutPage } from "./pages/about";
import { DemoPage } from "./pages/demo";
import { SignupPage } from "./pages/signup";
import { LoginPage } from "./pages/login";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { DashboardPage } from "./pages/dashboard";
import { GuestPage } from "./pages/guest";
import { QRPage } from "./pages/qr";
import { DiscoverPage } from "./pages/discover";
import { VenuePage } from "./pages/venue";
import { BatchDemoPage } from "./pages/batch-demo";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/guest" element={<GuestPage />} />
          <Route path="/venue/:venueId" element={<VenuePage />} />
          <Route path="/qr" element={<QRPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/batch-demo" element={<BatchDemoPage />} />
        </Routes>
      </div>
    </Router>
  );
}