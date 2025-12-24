import Authentication from "./views/Authentication.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authenticate" element={<Authentication />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
