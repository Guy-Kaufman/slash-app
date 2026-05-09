import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout/PublicLayout'
import AppLayout from './layouts/AppLayout/AppLayout'
import { SubscriptionsProvider } from './context/SubscriptionsContext'
import LandingPage from './pages/public/LandingPage/LandingPage'
import LoginPage from './pages/public/LoginPage/LoginPage'
import RegisterPage from './pages/public/RegisterPage/RegisterPage'
import ForgotPasswordPage from './pages/public/ForgotPasswordPage/ForgotPasswordPage'
import OnboardingPage from './pages/app/OnboardingPage/OnboardingPage'
import UploadPage from './pages/app/UploadPage/UploadPage'
import ProcessingPage from './pages/app/ProcessingPage/ProcessingPage'
import ReviewPage from './pages/app/ReviewPage/ReviewPage'
import DashboardPage from './pages/app/DashboardPage/DashboardPage'
import SubscriptionDetailPage from './pages/app/SubscriptionDetailPage/SubscriptionDetailPage'
import SavingsReportPage from './pages/app/SavingsReportPage/SavingsReportPage'
import SettingsPage from './pages/app/SettingsPage/SettingsPage'

function App() {
  return (
    <SubscriptionsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/subscription/:id" element={<SubscriptionDetailPage />} />
            <Route path="/savings" element={<SavingsReportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SubscriptionsProvider>
  )
}

export default App
