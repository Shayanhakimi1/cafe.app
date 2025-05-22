import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import { dummyImages } from "../assets/dummy-image";

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

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 8px 0;
`;

const CategoryCard = styled.div`
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(169, 124, 80, 0.15);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;

  /* Add styling for icon display */
  &.icon-image {
    height: 80px;
    width: 80px;
    object-fit: contain;
    margin: 20px auto;
    display: block;
  }
`;

const CategoryInfo = styled.div`
  padding: 12px;
  text-align: center;
`;

const CategoryName = styled.h3`
  color: #a97c50;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const ItemCount = styled.p`
  color: #8a8a8a;
  font-size: 0.8rem;
`;

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categoryCounts, setCategoryCounts] = useState({});

  // Define menu items data (same as in ProductList.jsx)
  const menuItems = {
    cappuccino: [
      {
        id: "cappuccino1",
        title: "کاپوچینو",
        desc: "با شیر کامل",
      },
      {
        id: "cappuccino2",
        title: "کاپوچینو کارامل",
        desc: "با سس کارامل",
      },
      {
        id: "cappuccino3",
        title: "کاپوچینو وانیل",
        desc: "با عصاره وانیل",
      },
    ],
    espresso: [
      {
        id: "espresso1",
        title: "اسپرسو",
        desc: "تک شات",
      },
      {
        id: "espresso2",
        title: "دابل اسپرسو",
        desc: "دبل شات",
      },
    ],
    americano: [
      {
        id: "americano1",
        title: "آمریکانو",
        desc: "اسپرسو با آب داغ",
      },
    ],
    mocha: [
      {
        id: "mocha1",
        title: "موکا",
        desc: "با شکلات و شیر",
      },
    ],
    latte: [
      {
        id: "latte1",
        title: "لاته",
        desc: "با شیر بخار داده شده",
      },
    ],
    hotCoffee: [
      {
        id: "hotCoffee1",
        title: "قهوه ترک",
        desc: "به سبک ترکی",
      },
    ],
    coldCoffee: [
      {
        id: "coldCoffee1",
        title: "آیس کافی",
        desc: "قهوه سرد با یخ",
      },
    ],
    desserts: [
      {
        id: "desserts1",
        title: "کیک شکلاتی",
        desc: "با روکش شکلات",
      },
    ],
    tea: [
      {
        id: "tea1",
        title: "چای سنتی",
        desc: "دمنوش ایرانی",
      },
    ],
  };

  // Calculate item counts for each category
  useEffect(() => {
    const counts = {};

    // Count items in each category
    Object.keys(menuItems).forEach((categoryId) => {
      counts[categoryId] = menuItems[categoryId].length;
    });

    setCategoryCounts(counts);
  }, []);

  const categories = [
    {
      id: "hotCoffee",
      name: "قهوه گرم",
      image: dummyImages.hotCoffee,
    },
    {
      id: "coldCoffee",
      name: "قهوه سرد",
      image: dummyImages.coldCoffee,
    },
    {
      id: "desserts",
      name: "دسرها",
      image: dummyImages.desserts,
    },
    {
      id: "cappuccino",
      name: "کاپوچینو",
      image: dummyImages.cappuccino,
    },
    {
      id: "latte",
      name: "لاته",
      image: dummyImages.latte,
    },
    {
      id: "espresso",
      name: "اسپرسو",
      image: dummyImages.espresso,
    },
    {
      id: "americano",
      name: "آمریکانو",
      image: dummyImages.americano,
    },
    {
      id: "mocha",
      name: "موکا",
      image: dummyImages.mocha,
    },
    {
      id: "tea",
      name: "چای و دمنوش",
      image: dummyImages.tea,
    },
  ];

  const handleCategoryClick = (categoryId) => {
    // Navigate to menu page with the selected category
    navigate(`/menu?category=${categoryId}`);
  };

  // Function to get proper plural form based on count
  const getItemText = (count) => {
    if (count === 1) {
      return "۱ آیتم";
    }
    return `${count} آیتم`;
  };

  return (
    <PageContainer>
      <StatusBar />
      <PageHeader>دسته‌بندی‌های منو</PageHeader>
      <ScrollableContent>
        <CategoryGrid>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              <CategoryImage
                src={category.image}
                alt={category.name}
                className="icon-image"
              />
              <CategoryInfo>
                <CategoryName>{category.name}</CategoryName>
                <ItemCount>
                  {categoryCounts[category.id] !== undefined
                    ? getItemText(categoryCounts[category.id])
                    : "در حال بارگذاری..."}
                </ItemCount>
              </CategoryInfo>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </ScrollableContent>
      <BottomNav active="categories" />
    </PageContainer>
  );
};

export default CategoriesPage;
