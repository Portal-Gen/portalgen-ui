import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./shared/components/layout/app-layout";
import QuestionnairePage from "./pages/questionnaire.page";

const AppRoutes = () => {
  return (
    <AppLayout>
      <Routes>

        <Route
          path="/"
          element={
              <QuestionnairePage />
          }
        />
    
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
