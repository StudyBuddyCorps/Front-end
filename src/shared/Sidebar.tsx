import React from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import Icon_home from "../assets/images/home.png";
import Icon_date from "../assets/images/date.png";
import Icon_group from "../assets/images/group.png";
import Icon_setting from "../assets/images/setting.png";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navigation>
        <NavLogo>
          <img src={Logo} alt="Logo" />
        </NavLogo>
        <NavMenu>
          <NavItem onClick={() => navigate("/home")}>
            <img src={Icon_home} alt="Home" />
          </NavItem>
          <NavItem onClick={() => navigate("/calendar")}>
            <img src={Icon_date} alt="Date" />
          </NavItem>
          <NavItem onClick={() => navigate("/group")}>
            <img src={Icon_group} alt="Group" />
          </NavItem>
          <NavItem onClick={() => navigate("/setting")}>
            <img src={Icon_setting} alt="Setting" />
          </NavItem>
        </NavMenu>
      </Navigation>
      <Outlet />
    </>
  );
};

const Navigation = styled.nav`
  position: fixed;
  width: 100px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  background-color: #212e42;
  padding: 30px 18px;
  box-sizing: border-box;
  border-radius: 0 5px 5px 0;
`;

const NavLogo = styled.div`
  margin: 0 auto;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

const NavItem = styled.li`
  cursor: pointer;
`;

export default Sidebar;
