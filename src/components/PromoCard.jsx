import styled from "styled-components";
import { dummyImages } from "../assets/dummy-image";

const PromoContainer = styled.div`
  margin: 0 16px 18px;
  background: #b5955c;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  justify-content: center;
  color: #fff;
  overflow: hidden;
  position: relative;
`;

const PromoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  text-align: center;
  width: 80%;
  margin-left: 5px;
`;

const PromoTime = styled.div`
  font-size: 12px;
  opacity: 0.9;
  margin-bottom: 6px;
`;

const PromoTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const PromoSubtitle = styled.p`
  font-size: 14px;
  margin-bottom: 12px;
  opacity: 0.95;
`;

const PromoButton = styled.button`
  background: #f7a73b;
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: "Vazirmatn", Tahoma, Arial, sans-serif;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background: #f0d288;
  }

  &:active {
    background: #f0d288;
  }
`;

const PromoImage = styled.img`
  width: 130px;
  height: 130px;
  object-fit: contain;
  position: absolute;
  left: -15px;
  bottom: -15px;
`;

const PromoCard = () => {
  return (
    <PromoContainer>
      <PromoInfo>
        <PromoTime>ساعت کاری: 6:30 صبح - 22 شب</PromoTime>
        <PromoTitle>لذت یک فنجان قهوه را با ما تجربه کنید</PromoTitle>
        <PromoSubtitle>حس خوب &nbsp;&nbsp; قهوه خوب</PromoSubtitle>
      </PromoInfo>
      <PromoImage src={dummyImages.mochaBanner} alt="پیشنهاد ویژه" />
    </PromoContainer>
  );
};

export default PromoCard;
