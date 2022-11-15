import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout";
import TeamPage from "./pages/TeamPage/TeamPage";
import { TeamExample } from "./model/FakeData";

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
          element={<HomePage isUserAuthorized={isUserAuthorized} />}
        />
        <Route path="roster" element={<TeamPage teamView={TeamExample} />} />
      </Route>
    </Routes>
  );
}

export default App;
