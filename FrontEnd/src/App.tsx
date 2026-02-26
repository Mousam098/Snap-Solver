import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./screens/home/canvas";
import LandingPage from "./screens/home/LandingPage";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import { useAuth } from "./contexts/AuthContext";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const AuthOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/canvas" replace />;
  } else {
    return <>{children}</>;
  }
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage />} 
        />
        <Route 
          path="/login" 
          element={
            <AuthOnlyRoute>
              <Login />
            </AuthOnlyRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <AuthOnlyRoute>
              <Register />
            </AuthOnlyRoute>
          } 
        />
        <Route
          path="/canvas"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
