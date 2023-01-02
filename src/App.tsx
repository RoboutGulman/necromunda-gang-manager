import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout";
import TeamPage from "./pages/TeamPage/TeamPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import FighterPage from "./pages/FighterPage/FighterPage";
import { ApiMethods } from "./request/methods/user/getCurrentUserByToken";
import { getCurrentUser, useUserDispatch } from "./providers/UserProvider";

export default function App() {
  //const [isUserAuthorized, setUserAuthorized] = React.useState(false);
  const userDispatch = useUserDispatch();

  useEffect(() => {
    getCurrentUser(userDispatch);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
          />
        }>
        <Route
          index
          element={
            <HomePage
            />
          }
        />
        <Route path="roster/:id" element={<TeamPage />} />
        <Route path="fighter/:id" element={<FighterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
