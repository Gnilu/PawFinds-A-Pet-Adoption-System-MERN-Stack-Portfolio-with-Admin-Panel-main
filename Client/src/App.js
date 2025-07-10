import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Pets from "./Components/Pets/Pets";
import AdoptForm from "./Components/AdoptForm/AdoptForm";
// import AdminLogin from "./Components/AdminPanel/AdminLogin";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import "./App.css";
import Appoinment from "./Components/Appoinment/Appointment";
import TreatmentList from "./Components/Treatment/TreatmentList";
import CartPage from "./Components/Cart/Cart";
import UserAccount from "./Components/Accounts/UserAccount"

const Layout = ({ children }) => (
  <>
    <Navbar title="PawFinds" />
    {children}
    <Footer title="PawFinds" />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout>
              <Home description="Ensure you are fully prepared to provide proper care and attention to your pet before welcoming them into your home." />
            </Layout>
          } 
        />
        <Route 
          path="/services" 
          element={
            <Layout>
              <Services />
            </Layout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Layout>
              <Contact />
            </Layout>
          } 
        />
        <Route 
          path="/pets" 
          element={
            <Layout>
              <Pets />
            </Layout>
          } 
        />
        <Route 
          path="/adopt-form" 
          element={
            <Layout>
              <AdoptForm />
            </Layout>
          } 
        />
         <Route 
          path="/appoinment" 
          element={
            <Layout>
              <Appoinment />
            </Layout>
          } 
        />
        <Route 
          path="/treatment" 
          element={
            <Layout>
              <TreatmentList />
            </Layout>
          } 
        />
        <Route 
        path="/cart"
        element={
          <Layout>
            <CartPage/>
          </Layout>
        }
        />
        <Route 
          path="/admin" 
          element={<AdminPanel />} 
        />

        <Route 
  path="/user-account" 
  element={
    <Layout>
      <UserAccount />
    </Layout>
  }
/>
      </Routes>
    </Router>
  );
};

export default App;
