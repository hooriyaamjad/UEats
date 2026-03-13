import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";

// TODO: add more routes here as pages are built (/signup, /login, /home, /profile, etc.)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

      </Routes>
    </BrowserRouter>
  );
}