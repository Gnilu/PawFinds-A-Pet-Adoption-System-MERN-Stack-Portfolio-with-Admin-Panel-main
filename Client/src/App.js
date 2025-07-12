import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
//import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Pets from "./Components/Pets/Pets";
import AdoptForm from "./Components/AdoptForm/AdoptForm";
// import AdminLogin from "./Components/AdminPanel/AdminLogin";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import "./App.css";
import Appointment from "./Components/Appointment/Appointment";
import TreatmentList from "./Components/Treatment/TreatmentList";
import CartPage from "./Components/Cart/Cart";
import Login from "./Components/UserLogin/Login";
import UserAccount from "./Components/Accounts/UserAccount";
import UserProfilePage from "./Components/Profile/UserProfile";
import AboutCanvas from "./Components/AboutUs/AboutUs";

const Layout = ({ children, onAboutClick, isAboutOpen, onAboutClose }) => (
  <>
    <Navbar title="PawFinds" onAboutClick={onAboutClick} />
    {isAboutOpen && <AboutCanvas isOpen={true} onClose={onAboutClose} />}
    {children}
    <Footer title="PawFinds" />
  </>
);

const App = () => {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              onAboutClick={() => setAboutOpen(true)}
              isAboutOpen={aboutOpen}
              onAboutClose={() => setAboutOpen(false)}
            >
              <Home description="Ensure you are fully prepared to provide proper care and attention to your pet before welcoming them into your home." />
            </Layout>
          }
        />
        {/* <Route
          path="/services"
          element={
            <Layout
              onAboutClick={() => setAboutOpen(true)}
              isAboutOpen={aboutOpen}
              onAboutClose={() => setAboutOpen(false)}
            >
              <Services />
            </Layout>
          }
        /> */}
        <Route
          path="/contact"
          element={
            <Layout
              onAboutClick={() => setAboutOpen(true)}
              isAboutOpen={aboutOpen}
              onAboutClose={() => setAboutOpen(false)}
            >
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/pets"
          element={
            <Layout
              onAboutClick={() => setAboutOpen(true)}
              isAboutOpen={aboutOpen}
              onAboutClose={() => setAboutOpen(false)}
            >
              <Pets />
            </Layout>
          }
        />
        <Route
          path="/adopt-form"
          element={
            <Layout
              onAboutClick={() => setAboutOpen(true)}
              isAboutOpen={aboutOpen}
              onAboutClose={() => setAboutOpen(false)}
            >
              <AdoptForm />
            </Layout>
          }
        />
        <Route
          path="/appointment"
          element={
            <Layout
              onAboutClick={() => setAboutOpen(true)}
              isAboutOpen={aboutOpen}
              onAboutClose={() => setAboutOpen(false)}
            >
              <Appointment />
            </Layout>
          }
        />
        <Route
          path="/treatment"
          element={
            <Layout
              onAboutClick={() => setAboutOpen(true)}
              isAboutOpen={aboutOpen}
              onAboutClose={() => setAboutOpen(false)}
            >
              <TreatmentList />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout
              onAboutClick={() => setAboutOpen(true)}
              isAboutOpen={aboutOpen}
              onAboutClose={() => setAboutOpen(false)}
            >
              <CartPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout
              onAboutClick={() => setAboutOpen(true)}
              isAboutOpen={aboutOpen}
              onAboutClose={() => setAboutOpen(false)}
            >
              <Login />
            </Layout>
          }
        />
        <Route
          path="/user-account"
          element={
            <Layout
              onAboutClick={() => setAboutOpen(true)}
              isAboutOpen={aboutOpen}
              onAboutClose={() => setAboutOpen(false)}
            >
              <UserAccount />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout
              onAboutClick={() => setAboutOpen(true)}
              isAboutOpen={aboutOpen}
              onAboutClose={() => setAboutOpen(false)}
            >
              <UserProfilePage />
            </Layout>
          }
        />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
