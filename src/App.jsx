import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ErrorBoundary } from "./components/ui";
import { Layout } from "./components/layout";
import { ProtectedRoute } from "./components/auth";
import { useScrollToTop } from "./utils/helpers";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";

function AppContent() {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute redirectAuth={true}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute redirectAuth={true}>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            <AppContent />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
