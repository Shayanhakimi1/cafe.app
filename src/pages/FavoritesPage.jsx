import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5e5d6;
  padding-bottom: 80px;
`;

const PageHeader = styled.div`
  background-color: #a97c50;
  color: white;
  padding: 20px 16px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ScrollableContent = styled.div`
  height: calc(100vh - 125px);
  overflow-y: auto;
  padding: 16px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 80px;
  padding: 0 24px;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e0d0b8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  svg {
    width: 40px;
    height: 40px;
    fill: #a97c50;
  }
`;

const EmptyText = styled.h3`
  color: #a97c50;
  font-size: 1.1rem;
  margin-bottom: 8px;
`;

const EmptyDescription = styled.p`
  color: #8a8a8a;
  font-size: 0.9rem;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const ExploreButton = styled.button`
  background-color: #a97c50;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #8a6540;
  }
`;

const FavoritesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FavoriteItem = styled.div`
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 4px 12px rgba(169, 124, 80, 0.1);
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const ItemContent = styled.div`
  flex: 1;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ItemName = styled.h3`
  color: #333;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const ItemRating = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #f7a73b;

  svg {
    margin-left: 4px;
    fill: #f7a73b;
  }
`;

const ItemDescription = styled.p`
  color: #8a8a8a;
  font-size: 0.8rem;
  margin-bottom: 8px;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemPrice = styled.span`
  color: #a97c50;
  font-weight: 600;
  font-size: 0.9rem;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  color: #a97c50;
  border: 1px solid #a97c50;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #a97c50;
    color: white;
  }
`;

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      const favoritesObj = JSON.parse(savedFavorites);
      // Convert from object to array
      setFavorites(Object.values(favoritesObj));
    }
  }, []);

  const removeFavorite = (id) => {
    // Remove from local state
    setFavorites(favorites.filter((item) => item.id !== id));

    // Update localStorage
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      const favoritesObj = JSON.parse(savedFavorites);
      delete favoritesObj[id];
      localStorage.setItem("favorites", JSON.stringify(favoritesObj));
    }
  };

  const hasFavorites = favorites.length > 0;

  return (
    <PageContainer>
      <StatusBar />
      <PageHeader>علاقه‌مندی‌های من</PageHeader>
      <ScrollableContent>
        {!hasFavorites ? (
          <EmptyState>
            <EmptyIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
              </svg>
            </EmptyIcon>
            <EmptyText>هیچ علاقه‌مندی ندارید</EmptyText>
            <EmptyDescription>
              با کلیک بر روی دکمه قلب روی محصولات، آنها را به لیست
              علاقه‌مندی‌های خود اضافه کنید.
            </EmptyDescription>
            <ExploreButton onClick={() => navigate("/menu")}>
              مشاهده منو
            </ExploreButton>
          </EmptyState>
        ) : (
          <FavoritesList>
            {favorites.map((item) => (
              <FavoriteItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemContent>
                  <div>
                    <ItemHeader>
                      <ItemName>{item.name}</ItemName>
                      <ItemRating>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        {item.rating}
                      </ItemRating>
                    </ItemHeader>
                    <ItemDescription>{item.description}</ItemDescription>
                  </div>
                  <ItemFooter>
                    <ItemPrice>{item.price} تومان</ItemPrice>
                    <RemoveButton onClick={() => removeFavorite(item.id)}>
                      حذف
                    </RemoveButton>
                  </ItemFooter>
                </ItemContent>
              </FavoriteItem>
            ))}
          </FavoritesList>
        )}
      </ScrollableContent>
      <BottomNav active="favorites" />
    </PageContainer>
  );
};

export default FavoritesPage;
