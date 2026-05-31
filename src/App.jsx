import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "../src/Component/ErrorBoundary/ErrorBoundary";
import Home from "./Component/Body/Home/Home";
import Login from "./Component/NavigationBar/Login";
import SingUp from "./Component/NavigationBar/SingUp";
import Workshops from "./Component/Body/Workshops/Workshops";
import Aboutus from "./Component/Body/Aboutus/Aboutus";
import AllEvents from "./Component/Body/Events/AllEvents";
import Courses from "./Component/Body/courses/Courses";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" index element={<Login />} />
        <Route path="/singUp" index element={<SingUp />} />
        <Route path="/workshops" index element={<Workshops />} />
        <Route path="/courses" index element={<Courses />} />

        <Route path="/aboutus" index element={<Aboutus />} />
        <Route path="/allevents" index element={<AllEvents />} />
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
