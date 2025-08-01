import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Nav = styled.nav`
  background-color: #1e293b;
  padding: 1rem 0;
  margin-bottom: 2rem;
`;

const NavContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 0 2rem;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? '#60a5fa' : '#e2e8f0'};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: #60a5fa;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export function Navigation() {
  const location = useLocation();

  return (
    <Nav>
      <NavContainer>
        <NavLink to="/" $isActive={location.pathname === '/'}>
          Home
        </NavLink>
        <NavLink to="/about" $isActive={location.pathname === '/about'}>
          About
        </NavLink>
      </NavContainer>
    </Nav>
  );
}