import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Detail } from "./Detail";
import { BrowserRouter, Route, Routes } from "react-router";
import { EnhancedRoot } from "./EnhancedRoot";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/frontend-rocks" element={<EnhancedRoot />} />
        <Route path="/frontend-rocks/dettaglio/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
