import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./views/Authentication.jsx";
import Dashboard from "./views/Dashboard.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authenticate" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
