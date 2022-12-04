import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import BagProvider from './contexts/BagContext';
import FavoriteProvider from './contexts/FavoritesContext';
import { FilterProvider } from './contexts/FilterContext';
import Create from './Create';
import Edit from './Edit';
import Home from './Home';
import Inventory from './Inventory';
import Login from './Login';
import Signup from './Signup';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function PrivateRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function AdminRoute() {
  const {isAuthenticated, isAdm} = useContext(AuthContext);

  return isAuthenticated && isAdm ? <Outlet /> : <Navigate to="/" />;
};

export default function AppRoutes() {

  return (

    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FilterProvider>
            <FavoriteProvider>
              <BagProvider>
                <Header />
                <Routes>
                  <Route path="/" exact element={<PrivateRoute />}>
                    <Route exact path="/" element={<Home />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/inventory" element={<AdminRoute />}>
                    <Route path="/inventory" element={<Inventory />} />
                  </Route>
                  <Route path="/edit/:id" element={<AdminRoute />}>
                    <Route path="/edit/:id" element={<Edit />} />
                  </Route>
                  <Route path="/create" element={<Create />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </BagProvider>
            </FavoriteProvider>
          </FilterProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  )
}