import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout";
import RosterPage from "./pages/RosterPage/RosterPage";

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
        <Route path="roster" element={<RosterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
