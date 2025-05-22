import styled from "styled-components";
import { dummyImages } from "../assets/dummy-image";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfilePic = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Location = styled.span`
  font-size: 14px;
  color: #a97c50;
`;

const HeaderIcons = styled.div`
  display: flex;
  gap: 16px;
`;

const Icon = styled.span`
  width: 24px;
  height: 24px;
  border: 2px solid #a97c50;
  border-radius: 50%;
  display: inline-block;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <UserProfile>
        <ProfilePic src={dummyImages.profile} alt="پروفایل" />
        <UserInfo>
          <Location>کافه نسکافه</Location>
        </UserInfo>
      </UserProfile>
      <HeaderIcons>
        <Icon className="icon-share" />
        <Icon className="icon-notifications" />
      </HeaderIcons>
    </HeaderContainer>
  );
};

export default Header;
