import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import WaveOpacityDivider from "./components/WaveOpacityDivider";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SunSVG from "./components/Sun";
import { useEffect } from "react";
import PlanATrip from "./pages/PlanATrip";
import MarqueeSlider from "./components/Marquee";

// Page transition animation
const pageVariants = {
  initial: { opacity: 0, y: 20 }, // Fade in from below
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } },
};

// Wrapper component for page transitions
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};


const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Change the background color directly based on the route
    if (location.pathname === '/register' || location.pathname === '/login') {
      document.body.style.backgroundColor = '#fceda8'; // Set background to #f9e484
    } else {
      document.body.style.backgroundColor = 'rgb(98, 194, 231)'; // Set background to rgb(98, 194, 231)
    }
  }, [location.pathname]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          }
        />
        <Route
          path="/plan-a-trip"
          element={
            <PageWrapper>
              <PlanATrip />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <PageWrapper>
              <Register />
            </PageWrapper>
          }
        />
      </Routes>
        <Footer />
        </div>
  );
};

export default () => (
  <div>
    <Navbar />
      <section className="mb-3">
        <WaveOpacityDivider />
        <MarqueeSlider />
        <SunSVG />
      </section>
  <Router>
    <App />
  </Router></div>
);