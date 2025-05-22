import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import starbuckLogo from "../assets/Starbuck Go!.png";

const SplashContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  direction: rtl;
  background: #684839;
  position: relative;
`;

const CoffeeImage = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: 2;

  img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
    animation: float 3s ease-in-out infinite;
    object-fit: contain;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const ContentCard = styled.div`
  background-color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  width: 80%;
  max-width: 320px;
  padding: 24px;
  text-align: center;
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

const WelcomeText = styled.h1`
  color: #a97c50;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const SplashDescription = styled.p`
  color: #724f32;
  font-size: 0.95rem;
  margin-bottom: 24px;
  line-height: 1.6;
`;

const StartButton = styled.button`
  background: #e1b06b;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 16px 0;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;

  &:hover {
    background: #f0d288;
  }

  &:active {
    background: #f0d288;
    transform: scale(0.98);
  }
`;

const LoadingIndicator = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(169, 124, 80, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 16px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    background-color: #a97c50;
    border-radius: 4px;
    animation: loading 1.5s infinite ease-in-out;
  }

  @keyframes loading {
    0% {
      left: -50%;
    }
    100% {
      left: 100%;
    }
  }
`;

const SplashScreen = ({ onEnter }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get current location from localStorage or default to menu
  const getTargetLocation = () => {
    const pathname = window.location.hash.substring(1) || "/menu";
    return pathname === "/" ? "/menu" : pathname;
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        // If onEnter prop exists, use it to signal App to hide splash screen
        if (onEnter) {
          onEnter();
        } else {
          // Otherwise, use navigation as normal (for direct access to /)
          navigate(getTargetLocation());
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading, navigate, onEnter]);

  const handleStart = () => {
    setLoading(true);

    // Set a flag for tracking clicks
    sessionStorage.setItem("clickedOnce", "true");

    // Start the navigation process immediately on first click
    // The setTimeout in useEffect will handle the actual navigation after showing loading animation
  };

  return (
    <SplashContainer>
      <CoffeeImage>
        <img src={starbuckLogo} alt="قهوه" />
      </CoffeeImage>

      <ContentCard>
        <WelcomeText>به کافه ما خوش آمدید</WelcomeText>
        <SplashDescription>
          بهترین دانه، بهترین رُست، قوی‌ترین طعم
          <br />
          تجربه‌ای متفاوت از نوشیدن قهوه
        </SplashDescription>

        <StartButton onClick={handleStart} disabled={loading}>
          {loading ? "در حال بارگذاری..." : "ورود به منو"}
        </StartButton>
        {loading && <LoadingIndicator />}
      </ContentCard>
    </SplashContainer>
  );
};

export default SplashScreen;
