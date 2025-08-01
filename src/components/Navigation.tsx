import styled from 'styled-components';
import logoSvgUrl from '../assets/svg/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { FONT_STYLES } from '../styles';

const Nav = styled.nav`
	background-color: var(--color-white);
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 40px;
	@media screen and (max-width: 1200px) {
		padding-top: 24px;
	}
	@media screen and (max-width: 900px) {
		padding-top: 16px;
	}
`;

const NavContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 64px;
	@media screen and (max-width: 1200px) {
		gap: 48px;
	}
	@media screen and (max-width: 900px) {
		gap: 32px;
	}
	@media screen and (max-width: 480px) {
		gap: 16px;
	}
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
	${FONT_STYLES.medium}
	font-size: 16px;
	color: var(--color-black);
	text-decoration: none;
	position: relative;
	&::before {
		content: '';
		display: block;
		width: 100%;
		height: 1px;
		background-color: var(--color-black);
		position: absolute;
		bottom: 0;
		left: 0;
		transform: scaleX(0);
		transition: transform 0.3s ease-in-out;
		transform-origin: left;
	}
	&:hover {
		opacity: 0.8;
	}
	&:hover::before {
		transform: scaleX(1);
	}
	${({ $isActive }) =>
		$isActive &&
		`
		&::before {
			transform: scaleX(1);
		}
	`}
`;

const Logo = styled.img`
	width: 120px;
	@media screen and (max-width: 1200px) {
		width: 100px;
	}
	@media screen and (max-width: 900px) {
		width: 80px;
	}
`;

export function Navigation() {
	const location = useLocation();

	return (
		<Nav>
			<NavContainer>
				<NavLink to="/s-petanque-lb/" $isActive={location.pathname === '/s-petanque-lb/'}>
					Leaderboard
				</NavLink>
				<Logo src={logoSvgUrl} alt="Signifly pétanque league" />
				<NavLink to="/s-petanque-lb/matches" $isActive={location.pathname === '/s-petanque-lb/matches'}>
					Matches
				</NavLink>
			</NavContainer>
		</Nav>
	);
}
