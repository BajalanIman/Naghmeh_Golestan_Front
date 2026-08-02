import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "../src/Component/ErrorBoundary/ErrorBoundary";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ScrollToTop from "./Component/ScrollToTop/ScrollToTop";
import Home from "./Component/Body/Home/Home";
import Login from "./Component/NavigationBar/Login";
import SingUp from "./Component/NavigationBar/SingUp";
import Workshops from "./Component/Body/Workshops/Workshops";
import WorkshopDetails from "./Component/Body/Workshops/WorkshopDetails";
import Aboutus from "./Component/Body/Aboutus/Aboutus";
import OurEvents from "./Component/Body/Events/OurEvents";
import Courses from "./Component/Body/courses/Courses";
import CourseDetails from "./Component/Body/courses/CourseDetails";
import Team from "./Component/Body/TeamMembers/Team";
import ContactUs from "./Component/Body/Footer/ContactUs";
import PrivacyPolicy from "./Component/Body/Footer/PrivacyPolicy";
import HelpCenter from "./Component/Body/Footer/HelpCenter";
import Terms from "./Component/Body/Footer/Terms";
import JoinUs from "./Component/Body/JoinUs/JoinUs";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = i18n.resolvedLanguage || i18n.language;
    const isPersian = currentLanguage?.startsWith("fa");

    document.documentElement.setAttribute("dir", isPersian ? "rtl" : "ltr");

    document.documentElement.setAttribute("lang", currentLanguage || "en");
  }, [i18n.language, i18n.resolvedLanguage]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" index element={<Login />} />
        <Route path="/singUp" index element={<SingUp />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshops/:id" element={<WorkshopDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/aboutus" index element={<Aboutus />} />
        <Route path="/ourEvents" index element={<OurEvents />} />
        <Route path="/team" index element={<Team />} />
        <Route path="/contactUs" index element={<ContactUs />} />
        <Route path="/privacyPolicy" index element={<PrivacyPolicy />} />
        <Route path="/helpCenter" index element={<HelpCenter />} />
        <Route path="/terms" index element={<Terms />} />
        <Route path="/joinUs" index element={<JoinUs />} />
      </Routes>
    </Router>
  );
}

export default function WrappedApp() {
  return import.meta.env.MODE === "development" ? (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  ) : (
    <App />
  );
}
