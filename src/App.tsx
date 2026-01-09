import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import BackToHomeButton from "./components/BackToHomeButton";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AddItemPage from "./pages/AddItemPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SearchResults from "./pages/SearchResults";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import TermosPage from "./pages/TermosPage";
import PrivacidadePage from "./pages/PrivacidadePage";
import NotFoundPage from "./pages/NotFoundPage";
import TrackingPage from "./pages/TrackingPage";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';
import "./styles/App.css";

function App() {
  return (
    
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/termos" element={<TermosPage />} />
        <Route path="/privacidade" element={<PrivacidadePage />} />

        {/* Rotas Privadas (Apenas logado) */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/add-item" element={<PrivateRoute><AddItemPage /></PrivateRoute>} />
        <Route path="/tracking" element={<PrivateRoute><TrackingPage /></PrivateRoute>} />
      
        {/* Página 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <BackToHomeButton />
    </AuthProvider>
  );
}

export default App;


