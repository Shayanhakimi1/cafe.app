import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import { dummyImages } from "../assets/dummy-image";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 80px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #a97c50;
  border-radius: 0 0 25px 25px;
  position: relative;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: white;
  }
`;

const FavoriteButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: ${(props) => (props.$isFavorite ? "#f44336" : "white")};
  }
`;

const ProductImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 8px solid white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

const ProductContent = styled.div`
  margin-top: 120px;
  padding: 16px;
`;

const ProductHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Rating = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #f7a73b;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-bottom: 8px;

  svg {
    margin-left: 4px;
    fill: white;
  }
`;

const ProductName = styled.h1`
  color: #333;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ProductPrice = styled.div`
  color: #a97c50;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 12px;
`;

const SizeOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SizeOption = styled.button`
  flex: 1;
  background-color: ${(props) => (props.$active ? "#a97c50" : "#f1ece8")};
  color: ${(props) => (props.$active ? "white" : "#666")};
  border: none;
  border-radius: 12px;
  padding: 10px;
  margin: 0 6px;
  font-size: 0.85rem;
  font-weight: ${(props) => (props.$active ? "600" : "normal")};
  cursor: pointer;
  transition: all 0.2s;

  &:first-child {
    margin-right: 0;
  }

  &:last-child {
    margin-left: 0;
  }

  &:hover {
    background-color: ${(props) => (props.$active ? "#8a6540" : "#e0d5c8")};
  }
`;

const AboutSection = styled.div`
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 8px;
`;

const ReadMore = styled.a`
  color: #a97c50;
  font-size: 0.85rem;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
`;

const QuantitySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const VolumeText = styled.div`
  color: #333;
  font-size: 0.9rem;

  span {
    font-weight: 600;
    margin-right: 8px;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0d0b8;
  border-radius: 8px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #a97c50;
  cursor: pointer;

  &:hover {
    background-color: #f5e5d6;
  }
`;

const QuantityValue = styled.span`
  width: 36px;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
`;

const AddToCartButton = styled.button`
  width: 100%;
  background-color: #a97c50;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;

  svg {
    margin-left: 8px;
    fill: white;
  }

  &:hover {
    background-color: #8a6540;
  }
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("small");
  const [product, setProduct] = useState({
    id: id || "cappuccino1",
    name: "کاپوچینو",
    price: "70,000",
    largePrice: "85,000",
    rating: 4.3,
    volume: "160ml",
    sizes: ["کوچک", "بزرگ"],
    description:
      "در مقایسه با لاته، کاپوچینو کامل‌تر و طعم قهوه در آن غلیظ‌تر است. این نوشیدنی ترکیبی از قهوه اسپرسو، شیر بخارپز شده و فوم شیر می‌باشد.",
    image: dummyImages.cappuccinoItem,
  });

  // Get the specific product based on ID
  useEffect(() => {
    const getProductDetails = () => {
      // This is a simplified product lookup based on ID
      // In a real app, this would come from an API or a more comprehensive data store

      const productMap = {
        // Cappuccino products
        cappuccino1: {
          name: "کاپوچینو",
          price: "70,000",
          largePrice: "85,000",
          image: dummyImages.cappuccinoItem,
        },
        cappuccino2: {
          name: "کاپوچینو کارامل",
          price: "75,000",
          largePrice: "90,000",
          image: dummyImages.caramelCappuccinoItem,
        },
        cappuccino3: {
          name: "کاپوچینو وانیل",
          price: "75,000",
          largePrice: "90,000",
          image: dummyImages.vanillaCappuccinoItem,
        },

        // Espresso products
        espresso1: {
          name: "اسپرسو",
          price: "45,000",
          image: dummyImages.espressoItem,
        },
        espresso2: {
          name: "دابل اسپرسو",
          price: "55,000",
          image: dummyImages.doubleEspressoItem,
        },
        espresso3: {
          name: "دبل اسپرسو فول کافئین",
          price: "65,000",
          image: dummyImages.doubleEspressoItem,
        },
        espresso4: {
          name: "سوپر دبل کافئین",
          price: "70,000",
          image: dummyImages.doubleEspressoItem,
        },

        // American products
        americano1: {
          name: "آمریکانو",
          price: "60,000",
          largePrice: "70,000",
          image: dummyImages.americanoItem,
        },

        // Mocha products
        mocha1: {
          name: "موکا",
          price: "75,000",
          largePrice: "85,000",
          image: dummyImages.mochaItem,
        },
        mocha2: {
          name: "آیس موکا",
          price: "85,000",
          image: dummyImages.icedMochaItem,
        },

        // Latte products
        latte1: {
          name: "لاته",
          price: "70,000",
          largePrice: "80,000",
          image: dummyImages.latteItem,
        },
        latte2: {
          name: "لاته فندق",
          price: "75,000",
          largePrice: "85,000",
          image: dummyImages.latteFanItem,
        },
        latte3: {
          name: "لاته نارگیل",
          price: "75,000",
          largePrice: "85,000",
          image: dummyImages.latteCocoItem,
        },
        latte4: {
          name: "آیس لاته",
          price: "75,000",
          image: dummyImages.icedLatteItem,
        },

        // Hot coffee products
        hotCoffee1: {
          name: "قهوه ترک",
          price: "70,000",
          largePrice: "85,000",
          image: dummyImages.hotCoffeeItem,
        },
        hotCoffee2: {
          name: "هات چاکلت",
          price: "70,000",
          largePrice: "85,000",
          image: dummyImages.hotCoffeeItem,
        },

        // Cold coffee products
        coldCoffee1: {
          name: "آیس کافی",
          price: "65,000",
          image: dummyImages.coldCoffeeItem,
        },
        coldCoffee2: {
          name: "کارامل ماکیاتو",
          price: "70,000",
          largePrice: "85,000",
          image: dummyImages.caramelMacchiatoItem,
        },

        // Dessert products
        desserts1: {
          name: "کیک شکلاتی",
          price: "45,000",
          image: dummyImages.dessertItem,
        },

        // Tea products
        tea1: {
          name: "چای سنتی",
          price: "70,000",
          largePrice: "80,000",
          image: dummyImages.teaItem,
        },
      };

      const productDetails = productMap[id];

      if (productDetails) {
        setProduct({
          ...product,
          id: id,
          name: productDetails.name,
          price: productDetails.price,
          largePrice: productDetails.largePrice,
          image: productDetails.image,
        });
      }
    };

    if (id) {
      getProductDetails();
    }
  }, [id]);

  // Get the current price based on the selected size
  const getCurrentPrice = () => {
    if (selectedSize === "large" && product.largePrice) {
      return product.largePrice;
    }
    return product.price;
  };

  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <StatusBar />
      <Header>
        <BackButton onClick={handleBackClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </BackButton>
        <FavoriteButton onClick={toggleFavorite} $isFavorite={isFavorite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </FavoriteButton>
      </Header>

      <ProductImage src={product.image} alt={product.name} />

      <ProductContent>
        <ProductHeader>
          <Rating>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {product.rating}
          </Rating>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{getCurrentPrice()} تومان</ProductPrice>
        </ProductHeader>

        <Section>
          <SectionTitle>سایز قهوه</SectionTitle>
          <SizeOptions>
            {product.sizes.map((size, index) => (
              <SizeOption
                key={index}
                $active={selectedSize === ["small", "large"][index]}
                onClick={() => setSelectedSize(["small", "large"][index])}
              >
                {size}
              </SizeOption>
            ))}
          </SizeOptions>
        </Section>

        <AboutSection>
          <SectionTitle>درباره</SectionTitle>
          <Description>{product.description}</Description>
          <ReadMore>بیشتر بخوانید...</ReadMore>
        </AboutSection>

        <QuantitySection>
          <VolumeText>
            حجم <span>{product.volume}</span>
          </VolumeText>
        </QuantitySection>
      </ProductContent>

      <BottomNav />
    </PageContainer>
  );
};

export default ProductDetailPage;
