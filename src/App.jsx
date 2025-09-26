import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
