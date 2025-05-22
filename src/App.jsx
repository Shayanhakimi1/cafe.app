import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import SplashPage from "./pages/SplashPage";
import MenuPage from "./pages/MenuPage";
import CategoriesPage from "./pages/CategoriesPage";
import FavoritesPage from "./pages/FavoritesPage";
import ContactPage from "./pages/ContactPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShopPage from "./pages/ShopPage";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // We still need the state but will need a way to update it
  const hideSplash = () => {
    setShowSplash(false);
  };

  return (
    <Router>
      <GlobalStyles />
      {showSplash ? (
        <SplashPage onEnter={hideSplash} />
      ) : (
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
