import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout";
import TeamPage from "./pages/TeamPage/TeamPage";
import { TeamExample } from "./model/FakeData";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import GangerPage from "./pages/GangerPage/GangerPage";

function App() {
  const [isUserAuthorized, setUserAuthorized] = React.useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            isUserAuthorized={isUserAuthorized}
            setUserAuthorized={setUserAuthorized}
          />
        }>
        <Route
          index
          element={
            <HomePage
              isUserAuthorized={isUserAuthorized}
              setUserAuthorized={setUserAuthorized}
            />
          }
        />
        <Route
          path="roster/:id"
          element={<TeamPage teamView={TeamExample} />}
        />
        <Route path="ganger/:id" element={<GangerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
