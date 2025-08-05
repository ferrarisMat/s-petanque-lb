import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FONT_STYLES } from '../styles';

const FooterContainer = styled.footer`
	z-index: 100;
	position: fixed;
	padding: 24px;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	background-color: var(--color-white);
`;

const FooterLink = styled(Link)<{ $isActive: boolean }>`
	${FONT_STYLES.regular}
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

export function Footer() {
	const location = useLocation();

	return (
		<FooterContainer>
			<FooterLink to="/s-petanque-lb/admin" $isActive={location.pathname === '/s-petanque-lb/admin'}>
				Admin
			</FooterLink>
		</FooterContainer>
	);
}
