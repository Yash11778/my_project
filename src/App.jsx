import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Themes from "./components/Themes";
import ProblemStatementsPage from "./pages/ProblemStatementsPage";
import { motion } from "framer-motion";
import ExpoEvent from "./components/ExpoEvent";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <main className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Hero />
                <Benefits />
                <Themes />
                <Roadmap />
                <ExpoEvent />
                <Pricing />
                <Collaboration />
              </main>
              <Footer />
            </>
          }
        />
        <Route path="/problem-statements" element={<ProblemStatementsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
