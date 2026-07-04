import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ProtectedRoute, PublicOnlyRoute } from "./components/common/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import SubjectsPage from "./pages/dashboard/Subjects";
import UploadPage from "./pages/dashboard/Upload";
import SummaryPage from "./pages/dashboard/Summary";
import FlashcardsPage from "./pages/dashboard/Flashcards";
import QuizPage from "./pages/dashboard/Quiz";
import ChatPage from "./pages/dashboard/Chat";
import PlannerPage from "./pages/dashboard/Planner";
import HistoryPage from "./pages/dashboard/History";
import ProfilePage from "./pages/dashboard/Profile";
import SettingsPage from "./pages/dashboard/Settings";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="subjects" element={<SubjectsPage />} />
                <Route path="upload" element={<UploadPage />} />
                <Route path="summary/:noteId" element={<SummaryPage />} />
                <Route path="flashcards" element={<FlashcardsPage />} />
                <Route path="quiz" element={<QuizPage />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="planner" element={<PlannerPage />} />
                <Route path="history" element={<HistoryPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
