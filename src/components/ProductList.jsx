import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { dummyImages } from "../assets/dummy-image";

const ProductListContainer = styled.div`
  padding: 0 16px;
  margin-bottom: 80px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
`;

const ProductCard = styled.div`
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 12px;
`;

const ProductTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductDesc = styled.p`
  font-size: 0.8rem;
  color: #777;
  margin: 0 0 10px 0;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductPrice = styled.span`
  color: #a97c50;
  font-weight: 600;
  font-size: 0.9rem;
`;

const AddButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #a97c50;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #8a6540;
  }

  svg {
    width: 18px;
    height: 18px;
    fill: white;
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => (props.$favorite ? "#f44336" : "#aaa")};
    transition: fill 0.2s;
  }

  &:hover svg {
    fill: ${(props) => (props.$favorite ? "#f44336" : "#777")};
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 30px 0;
  color: #666;
  font-size: 1rem;
`;

const ProductList = ({ category, searchTerm }) => {
  const navigate = useNavigate();
  const [filteredItems, setFilteredItems] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    // Initialize favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : {};
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // نمونه داده برای منو
  const menuItems = {
    cappuccino: [
      {
        id: "cappuccino1",
        title: "کاپوچینو",
        desc: "با شیر کامل",
        price: "۷۰٬۰۰۰ تومان",
        image: dummyImages.cappuccinoItem,
      },
      {
        id: "cappuccino2",
        title: "کاپوچینو کارامل",
        desc: "با سس کارامل",
        price: "۷۵٬۰۰۰ تومان",
        image: dummyImages.caramelCappuccinoItem,
      },
      {
        id: "cappuccino3",
        title: "کاپوچینو وانیل",
        desc: "با عصاره وانیل",
        price: "۷۵٬۰۰۰ تومان",
        image: dummyImages.vanillaCappuccinoItem,
      },
    ],
    espresso: [
      {
        id: "espresso1",
        title: "اسپرسو",
        desc: "تک شات",
        price: "۴۵٬۰۰۰ تومان",
        image: dummyImages.espressoItem,
      },
      {
        id: "espresso2",
        title: "دابل اسپرسو",
        desc: "دبل شات",
        price: "۵۵٬۰۰۰ تومان",
        image: dummyImages.espressoItem,
      },
      {
        id: "espresso3",
        title: "دبل اسپرسو فول کافئین",
        desc: "فول کافئین دو شات",
        price: "۶۵٬۰۰۰ تومان",
        image: dummyImages.espressoItem,
      },
      {
        id: "espresso4",
        title: "سوپر دبل کافئین",
        desc: "سوپر پرکافئین دو شات",
        price: "۷۰٬۰۰۰ تومان",
        image: dummyImages.espressoItem,
      },
    ],
    americano: [
      {
        id: "americano1",
        title: "آمریکانو",
        desc: "اسپرسو با آب داغ",
        price: "۶۰٬۰۰۰ تومان",
        image: dummyImages.americanoItem,
      },
    ],
    mocha: [
      {
        id: "mocha1",
        title: "موکا",
        desc: "با شکلات و شیر",
        price: "۷۵٬۰۰۰ تومان",
        image: dummyImages.mochaItem,
      },
      {
        id: "mocha2",
        title: "آیس موکا",
        desc: "موکا سرد با یخ",
        price: "۸۵٬۰۰۰ تومان",
        image: dummyImages.icedMochaItem,
      },
    ],
    latte: [
      {
        id: "latte1",
        title: "لاته",
        desc: "با شیر بخار داده شده",
        price: "۸۵٬۰۰۰ تومان",
        image: dummyImages.latteItem,
      },
      {
        id: "latte2",
        title: "لاته فندق",
        desc: "با طعم فندق",
        price: "۷۵٬۰۰۰ تومان",
        image: dummyImages.latteFanItem,
      },
      {
        id: "latte3",
        title: "لاته نارگیل",
        desc: "با طعم نارگیل",
        price: "۷۵٬۰۰۰ تومان",
        image: dummyImages.latteCocoItem,
      },
      {
        id: "latte4",
        title: "آیس لاته",
        desc: "لاته سرد با یخ",
        price: "۷۵٬۰۰۰ تومان",
        image: dummyImages.icedLatteItem,
      },
    ],
    hotCoffee: [
      {
        id: "hotCoffee1",
        title: "قهوه ترک",
        desc: "به سبک ترکی",
        price: "۶۰٬۰۰۰ تومان",
        image: dummyImages.hotCoffeeItem,
      },
      {
        id: "hotCoffee2",
        title: "هات چاکلت",
        desc: "شکلات داغ خامه‌ای",
        price: "۷۰٬۰۰۰ تومان",
        image: dummyImages.hotCoffeeItem,
      },
    ],
    coldCoffee: [
      {
        id: "coldCoffee1",
        title: "آیس کافی",
        desc: "قهوه سرد با یخ",
        price: "۶۵٬۰۰۰ تومان",
        image: dummyImages.coldCoffeeItem,
      },
      {
        id: "coldCoffee2",
        title: "کارامل ماکیاتو",
        desc: "با سس کارامل",
        price: "۷۰٬۰۰۰ تومان",
        image: dummyImages.caramelMacchiatoItem,
      },
    ],
    desserts: [
      {
        id: "desserts1",
        title: "کیک شکلاتی",
        desc: "با روکش شکلات",
        price: "۷۵٬۰۰۰ تومان",
        image: dummyImages.dessertItem,
      },
    ],
    tea: [
      {
        id: "tea1",
        title: "چای سنتی",
        desc: "دمنوش ایرانی",
        price: "۷۰٬۰۰۰ تومان",
        image: dummyImages.teaItem,
      },
    ],
  };

  // Filter items based on category and search term
  useEffect(() => {
    // Get all menu items flattened into one array
    const allItems = Object.values(menuItems).flat();

    if (searchTerm) {
      // If search term exists, filter items by search term
      const term = searchTerm.toLowerCase();
      const results = allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.desc.toLowerCase().includes(term)
      );
      setFilteredItems(results);
    } else if (category) {
      // If no search term but category exists, filter by category
      setFilteredItems(menuItems[category] || []);
    } else {
      // When both search and category are empty, show all products
      setFilteredItems(allItems);
    }
  }, [category, searchTerm]);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const newFavorites = { ...prev };

      if (prev[id]) {
        delete newFavorites[id];
      } else {
        // Find the item from all menu items to store
        const allItems = Object.values(menuItems).flat();
        const item = allItems.find((item) => item.id === id);
        if (item) {
          newFavorites[id] = item;
        }
      }

      return newFavorites;
    });
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const getSectionTitle = () => {
    if (searchTerm) {
      return `نتایج جستجو برای "${searchTerm}"`;
    } else if (category) {
      // Find category name from the menu data
      const categoryNames = {
        cappuccino: "کاپوچینو",
        espresso: "اسپرسو",
        americano: "آمریکانو",
        mocha: "موکا",
        latte: "لاته",
        hotCoffee: "قهوه گرم",
        coldCoffee: "قهوه سرد",
        desserts: "دسرها",
        tea: "چای",
      };
      return categoryNames[category] || "منوی ما";
    }
    return "تمام محصولات";
  };

  return (
    <ProductListContainer>
      <SectionTitle>{getSectionTitle()}</SectionTitle>

      {filteredItems.length > 0 ? (
        <ProductGrid>
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              onClick={() => handleProductClick(item.id)}
            >
              <ProductImage src={item.image} alt={item.title} />
              <FavoriteButton
                $favorite={Boolean(favorites[item.id])}
                onClick={(e) => toggleFavorite(item.id, e)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </FavoriteButton>
              <ProductInfo>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductDesc>{item.desc}</ProductDesc>
                <ProductMeta>
                  <ProductPrice>{item.price}</ProductPrice>
                </ProductMeta>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      ) : (
        <NoResultsMessage>
          {searchTerm
            ? `محصولی با عنوان "${searchTerm}" یافت نشد.`
            : "هیچ محصولی در این دسته‌بندی وجود ندارد."}
        </NoResultsMessage>
      )}
    </ProductListContainer>
  );
};

export default ProductList;
