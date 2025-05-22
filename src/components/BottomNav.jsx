import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  height: 65px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px 0;
  width: 20%;

  svg {
    margin-bottom: 4px;
    fill: ${(props) => (props.$active ? "#a97c50" : "#939393")};
    transition: fill 0.2s ease;
  }

  span {
    font-size: 0.7rem;
    color: ${(props) => (props.$active ? "#a97c50" : "#939393")};
    font-weight: ${(props) => (props.$active ? "600" : "normal")};
    transition: color 0.2s ease;
  }

  &:hover {
    svg,
    span {
      fill: #724f32;
      color: #724f32;
    }
  }
`;

const BottomNav = ({ active: activeFromProps }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(
    activeFromProps ||
      (location.pathname === "/menu"
        ? "menu"
        : location.pathname === "/favorites"
        ? "favorites"
        : location.pathname === "/categories"
        ? "categories"
        : location.pathname === "/shop"
        ? "shop"
        : location.pathname === "/contact"
        ? "contact"
        : "menu")
  );

  useEffect(() => {
    if (activeFromProps) {
      setActive(activeFromProps);
    }
  }, [activeFromProps]);

  const handleNavClick = (route, name) => {
    setActive(name);
    navigate(route);
  };

  return (
    <NavContainer>
      <NavItem
        $active={active === "menu"}
        onClick={() => handleNavClick("/menu", "menu")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span>خانه</span>
      </NavItem>

      <NavItem
        $active={active === "categories"}
        onClick={() => handleNavClick("/categories", "categories")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z" />
        </svg>
        <span>دسته‌بندی‌ها</span>
      </NavItem>

      <NavItem
        $active={active === "shop"}
        onClick={() => handleNavClick("/shop", "shop")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
        <span>فروشگاه</span>
      </NavItem>

      <NavItem
        $active={active === "favorites"}
        onClick={() => handleNavClick("/favorites", "favorites")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span>علاقه‌مندی‌ها</span>
      </NavItem>

      <NavItem
        $active={active === "contact"}
        onClick={() => handleNavClick("/contact", "contact")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        <span>تماس با ما</span>
      </NavItem>
    </NavContainer>
  );
};

export default BottomNav;
