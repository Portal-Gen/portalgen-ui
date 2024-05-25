import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./shared/components/layout/app-layout";
import QuestionnairePage from "./pages/questionnaire.page";
import PlaceRecommendations from "./pages/places.page";
import PlaceDetails from "./pages/place-details.page";

const AppRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<QuestionnairePage />} />

        <Route path="/places" element={<PlaceRecommendations />} />

        <Route path="/place/:id" element={<PlaceDetails />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppLayout>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
