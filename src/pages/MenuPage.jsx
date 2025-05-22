import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import StatusBar from "../components/StatusBar";
import SearchBox from "../components/SearchBox";
import PromoCard from "../components/PromoCard";
import MenuTabs from "../components/MenuTabs";
import ProductList from "../components/ProductList";
import BottomNav from "../components/BottomNav";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5e5d6;
  padding-bottom: 80px; /* Space for bottom nav */
`;

const ScrollableContent = styled.div`
  height: calc(100vh - 65px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

const MenuPage = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Parse category from URL query parameters when component mounts or URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [location.search]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId === activeCategory ? "" : categoryId);

    // Clear search when category changes
    if (searchTerm) {
      setSearchTerm("");
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);

    // If search is active, don't filter by category
    if (term) {
      setActiveCategory("");
    }
    // Don't force a default category when search is cleared
  };

  return (
    <PageContainer>
      <StatusBar />
      <ScrollableContent>
        <SearchBox onSearch={handleSearch} />
        <PromoCard />
        <MenuTabs
          onCategoryChange={handleCategoryChange}
          initialCategory={activeCategory}
        />
        <ProductList category={activeCategory} searchTerm={searchTerm} />
      </ScrollableContent>
      <BottomNav active="menu" />
    </PageContainer>
  );
};

export default MenuPage;
