import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { dummyImages } from "../assets/dummy-image";

const TabsContainer = styled.div`
  margin: 0 0 22px;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 16px;
  position: relative;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; /* Better touch scrolling on iOS */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabsWrapper = styled.div`
  display: inline-flex;
  padding: 4px 0;
  gap: 15px;
  animation: slideRight 0.8s ease-out;

  @keyframes slideRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const TabItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  min-width: 70px;
`;

const TabIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "#f0d288" : "#f1ece8")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
  box-shadow: ${(props) =>
    props.$active ? "0 4px 8px rgba(240, 210, 136, 0.3)" : "none"};
  transition: all 0.2s ease;

  img {
    width: 36px;
    height: 36px;
    object-fit: contain;
    filter: ${(props) =>
      props.$active ? "brightness(1.1) invert(0.1)" : "none"};
  }

  &:hover {
    background: #f0d288;
    transform: translateY(-2px);
  }
`;

const TabLabel = styled.span`
  font-size: 0.85rem;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  color: ${(props) => (props.$active ? "#f0d288" : "#6b6b6b")};
  transition: color 0.2s ease;

  ${TabItem}:hover & {
    color: #f0d288;
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f0d288;
  display: ${(props) => (props.$active ? "block" : "none")};
`;

const MenuTabs = ({ onCategoryChange, initialCategory }) => {
  const [activeTab, setActiveTab] = useState(initialCategory);
  const tabsRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  useEffect(() => {
    if (initialCategory !== activeTab) {
      setActiveTab(initialCategory);
    }

    // Add infinite scroll effect - when reaching end, jump back to beginning
    const handleScroll = () => {
      if (tabsRef.current) {
        const container = tabsRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const scrollLeft = container.scrollLeft;

        // If near the end, scroll back to beginning
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          // Add smooth transition when looping back
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: "smooth" });
          }, 300);
        }
      }
    };

    const container = tabsRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    // Auto-scroll functionality - every 5 seconds
    const startAutoScroll = () => {
      if (tabsRef.current) {
        const container = tabsRef.current;
        const scrollAmount = 100; // Adjust this value to control scroll distance

        // Clear any existing interval
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
        }

        // Set new interval for auto-scrolling
        autoScrollIntervalRef.current = setInterval(() => {
          const maxScrollLeft = container.scrollWidth - container.clientWidth;
          const newScrollLeft = container.scrollLeft + scrollAmount;

          // If we're near the end, go back to start
          if (newScrollLeft >= maxScrollLeft) {
            container.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
          }
        }, 5000); // Auto-scroll every 5 seconds
      }
    };

    startAutoScroll();

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }

      // Clear interval on component unmount
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [initialCategory, activeTab]);

  const categories = [
    {
      id: "cappuccino",
      name: "کاپوچینو",
      icon: dummyImages.cappuccino,
    },
    {
      id: "americano",
      name: "آمریکانو",
      icon: dummyImages.americano,
    },
    {
      id: "espresso",
      name: "اسپرسو",
      icon: dummyImages.espresso,
    },
    {
      id: "latte",
      name: "لاته",
      icon: dummyImages.latte,
    },
    {
      id: "mocha",
      name: "موکا",
      icon: dummyImages.mocha,
    },
    {
      id: "hotCoffee",
      name: "قهوه گرم",
      icon: dummyImages.hotCoffee,
    },
    {
      id: "coldCoffee",
      name: "قهوه سرد",
      icon: dummyImages.coldCoffee,
    },
    {
      id: "desserts",
      name: "دسرها",
      icon: dummyImages.desserts,
    },
    {
      id: "tea",
      name: "چای",
      icon: dummyImages.tea,
    },
  ];

  const handleCategoryChange = (categoryId) => {
    setActiveTab(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <TabsContainer ref={tabsRef}>
      <TabsWrapper>
        {categories.map((category) => (
          <TabItem
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
          >
            <TabIcon $active={activeTab === category.id}>
              <img src={category.icon} alt={category.name} />
            </TabIcon>
            <TabLabel $active={activeTab === category.id}>
              {category.name}
            </TabLabel>
            <ActiveIndicator $active={activeTab === category.id} />
          </TabItem>
        ))}
      </TabsWrapper>
    </TabsContainer>
  );
};

export default MenuTabs;
