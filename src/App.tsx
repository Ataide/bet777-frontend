import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/Auth";
import { LayoutProvider } from "./contexts/Layout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import { ToastContainer } from "react-toastify";

import DashboardPage from "./pages/dashboard";

import NotFoundPage from "./pages/notfound";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import FavoritesPage from "./pages/Favorites/favorites";
import SportsPage from "./pages/Sports/sports";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Router>
      <AuthProvider>
        <LayoutProvider>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<AuthenticatedLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/favoritos" element={<FavoritesPage />} />
              <Route path="/esportes" element={<SportsPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </LayoutProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
