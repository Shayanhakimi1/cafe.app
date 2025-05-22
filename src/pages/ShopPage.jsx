import { useState } from "react";
import styled from "styled-components";
import BottomNav from "../components/BottomNav";
import StatusBar from "../components/StatusBar";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5e5d6;
  padding-bottom: 80px;
`;

const TitleBar = styled.div`
  background-color: #a97c50;
  color: white;
  padding: 16px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContentContainer = styled.div`
  padding: 16px;
  padding-bottom: 80px;
  max-width: 100%;
  margin: 0 auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 12px;
  text-align: right;
`;

const ProductName = styled.h3`
  margin: 0 0 5px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ProductDescription = styled.p`
  margin: 0 0 8px;
  font-size: 13px;
  color: #666;
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  font-weight: bold;
  color: #a97c50;
  font-size: 16px;
`;

const BuyButton = styled.button`
  background-color: #a97c50;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8c6540;
  }
`;

const ShopPage = () => {
  const [coffeeProducts] = useState([
    {
      id: 1,
      name: "قهوه اسپرسو",
      description: "قهوه اسپرسو با عطر و طعم استثنایی",
      price: 65000,
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 2,
      name: "قهوه ترک",
      description: "قهوه ترک اصیل و خوش عطر",
      price: 55000,
      image:
        "https://images.unsplash.com/photo-1578667242508-a0753a0e6492?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 3,
      name: "قهوه فرانسه",
      description: "قهوه فرانسه با روش پرس سرد",
      price: 82000,
      image:
        "https://images.unsplash.com/photo-1559001724-fbad036dbc9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 4,
      name: "قهوه دمی",
      description: "قهوه دمی سنتی با طعم و رایحه منحصر به فرد",
      price: 45000,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    },
  ]);

  return (
    <PageContainer>
      <StatusBar />
      <TitleBar>فروش انواع قهوه</TitleBar>
      <ContentContainer>
        <ProductsGrid>
          {coffeeProducts.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>
                  {product.price.toLocaleString()} تومان
                </ProductPrice>
                <BuyButton>افزودن به سبد</BuyButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      </ContentContainer>
      <BottomNav active="shop" />
    </PageContainer>
  );
};

export default ShopPage;
