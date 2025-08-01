import styled from 'styled-components';
import { FONT_STYLES } from '../styles';

const SwitcherContainer = styled.div<{ $isActive: boolean }>`
	display: flex;
	align-items: center;
	gap: 8px;
	border: 1px solid var(--color-black);
	grid-column: 6 / 8;
	padding: 2px;
	border-radius: 50px;
	position: relative;
	@media screen and (max-width: 1200px) {
		grid-column: 5 / 9;
	}
	@media screen and (max-width: 900px) {
		grid-column: 1 / 14;
	}
	&::before {
		content: '';
		position: absolute;
		display: block;
		width: 50%;
		border-radius: 50px;
		height: calc(100% - 4px);
		background-color: var(--color-black);
		z-index: 1;
		transition: transform 0.3s ease-in-out;
		transform: translateX(${({ $isActive }) => ($isActive ? '0' : 'calc(100% - 4px)')});
	}
	.switcher-button {
		flex: 1;
		appearance: none;
		border: none;
		background: none;
		padding: 6px;
		z-index: 2;
		cursor: pointer;
		${FONT_STYLES.regular}
		font-size: 18px;
		color: var(--color-black);
		&.active {
			${FONT_STYLES.semibold}
			color: var(--color-white);
		}
	}
`;

export function Switcher(props: { options: string[]; activeOption: string; onOptionChange: (option: string) => void }) {
	const { options, activeOption, onOptionChange } = props;

	return (
		<SwitcherContainer $isActive={activeOption === options[0]}>
			{options.map((option) => (
				<button
					key={option}
					className={`switcher-button ${activeOption === option ? 'active' : ''}`}
					onClick={() => onOptionChange(option)}
				>
					{option}
				</button>
			))}
		</SwitcherContainer>
	);
}
