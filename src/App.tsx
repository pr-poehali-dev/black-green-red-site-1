import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreateCode from "./pages/CreateCode";
import NotFound from "./pages/NotFound";
import { CodeProvider } from "./context/CodeContext";
import "./App.css";

function App() {
  return (
    <CodeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<CreateCode />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CodeProvider>
  );
}

export default App;
