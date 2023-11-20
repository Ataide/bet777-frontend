import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LayoutProvider } from "./contexts/Layout";
import AuthenticatedLayout from "./layouts/authenticatedLayout";
import { ToastContainer } from "react-toastify";

import DashboardPage from "./pages/dashboard";

import NotFoundPage from "./pages/notfound";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import FavoritesPage from "./pages/favorites/favorites";
import SportsPage from "./pages/sports/sports";
import { AppProvider } from "./contexts/AppContext";
import AccountPage from "./pages/account/account";
import BetsPage from "./pages/account/bets";
import DepositPage from "./pages/account/deposit";
import WithdrawPage from "./pages/account/withdraw";
import SportPage from "./pages/sport/sport";
import TransactionsPage from "./pages/account/transaction";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Router>
      <LayoutProvider>
        <AppProvider>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<AuthenticatedLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/favoritos" element={<FavoritesPage />} />
              <Route path="/esportes" element={<SportsPage />} />
              <Route path="/esportes/:sportId" element={<SportPage />} />
              <Route path="/conta" element={<AccountPage />} />
              <Route path="/conta/bets" element={<BetsPage />} />
              <Route path="/conta/deposito" element={<DepositPage />} />
              <Route path="/conta/saque" element={<WithdrawPage />} />
              <Route path="/conta/transacoes" element={<TransactionsPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppProvider>
      </LayoutProvider>
    </Router>
  );
}

export default App;
