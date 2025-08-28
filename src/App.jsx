import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import TrustedExpertisePage from "./components/TrustedExpertisePage";
import LayananKami from "./components/LayananKami";
import TrustedCompanies from "./components/TrustedCompanies";
import WhyChooseUs from "./components/WhyChooseUs";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";
import StrukturOrganisasi from "./components/StrukturOrganisasi";
import LowonganKerja from "./components/LowonganKerja";
import Album from "./components/Album";
import ArticlesPage from "./components/Article";
import LowonganDetail from "./components/LowonganDetail";
import AdminDashboard from "./components/AdminDashboard";
import AboutUsPage from "./components/AboutUs";
import AdminNavbar from "./components/AdminNavbar";
import AdminLoginPage from "./components/AdminLoginPage";

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <main className="max-w-screen ">{children}</main>
      {/* Footer admin bisa ditambahkan jika diperlukan */}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman publik menggunakan PublicLayout */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <>
                <HeroSection />
                <TrustedExpertisePage />
                <LayananKami />
                <TrustedCompanies />
                <WhyChooseUs />
              </>
            </PublicLayout>
          }
        />
        <Route
          path="/tentang-kami"
          element={
            <PublicLayout>
              <StrukturOrganisasi />
            </PublicLayout>
          }
        />
        <Route
          path="/lowongan-kerja"
          element={
            <PublicLayout>
              <LowonganKerja />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          }
        />
        <Route
          path="/album"
          element={
            <PublicLayout>
              <Album />
            </PublicLayout>
          }
        />
        <Route
          path="/article"
          element={
            <PublicLayout>
              <ArticlesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/lowongan/:id"
          element={
            <PublicLayout>
              <LowonganDetail />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <AboutUsPage />
            </PublicLayout>
          }
        />

        {/* Halaman admin menggunakan AdminLayout */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route path="/login" element={<AdminLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
