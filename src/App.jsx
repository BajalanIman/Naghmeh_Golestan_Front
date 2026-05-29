import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "../src/Component/ErrorBoundary/ErrorBoundary";
import Home from "./Component/Body/Home/Home";
import Login from "./Component/NavigationBar/Login";
import SingUp from "./Component/NavigationBar/SingUp";
import Workshops from "./Component/Body/Workshops/Workshops";
import Aboutus from "./Component/Body/Aboutus/Aboutus";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" index element={<Login />} />
        <Route path="/singUp" index element={<SingUp />} />
        <Route path="/workshops" index element={<Workshops />} />
        <Route path="/aboutus" index element={<Aboutus />} />
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
