import styled from 'styled-components';
import { FONT_STYLES } from '../styles';

const TeamMatchCardContainer = styled.div<{ $isLive: boolean; $isFinished: boolean; $invert?: boolean }>`
	display: flex;
	border: 1px solid var(--color-black);
	width: 100%;
	justify-content: space-between;
	${({ $invert }) =>
		$invert &&
		`
			flex-direction: row-reverse;
			`}

	.team-data {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.team-name,
	.team-player {
		${FONT_STYLES.medium}
		font-size: 16px;
	}

	.team-name {
		font-size: 18px;
		border-bottom: 1px solid var(--color-black);
		padding: 4px 8px;
		${({ $invert }) =>
			$invert &&
			`
			text-align: right;
			`}
	}
	.team-player {
		font-size: 12px;
	}
	.team-player-wrapper {
		padding: 4px 8px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid var(--color-black);
		${({ $invert }) =>
			$invert &&
			`
			flex-direction: row-reverse;
			`}
		@media screen and (max-width: 480px) {
			flex-direction: column;
		}
		&:last-of-type {
			border-bottom: none;
		}
	}

	.team-score {
		${FONT_STYLES.medium}
		width: 50px;
		font-size: 16px;
		border-left: 1px solid var(--color-black);
		padding: 0 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		@media screen and (max-width: 480px) {
			width: 40px;
			font-size: 14px;
		}
		${({ $isLive }) =>
			$isLive &&
			`
			background-color: var(--color-red);
			color: var(--color-white);
			`}
		${({ $isFinished }) =>
			$isFinished &&
			`
			background-color: var(--color-black);
			color: var(--color-white);
			`}
		${({ $invert }) =>
			$invert &&
			`
			border-left: none;
			border-right: 1px solid var(--color-black);
			`}
	}

	.player-controls {
		display: flex;
		gap: 2px;
		align-items: center;
		@media screen and (max-width: 480px) {
			margin: 0;
		}
	}

	.player-control-button {
		width: 10px;
		height: 10px;
		background-color: var(--color-black);
		border: none;
		border-radius: 50%;
		color: var(--color-white);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-size: 8px;
		&:hover {
			opacity: 0.8;
		}
	}
`;

export function TeamMatchCard(props: {
	teamName: string;
	player1: string;
	player1Id: string;
	player2: string;
	player2Id: string;
	score1: number;
	score2: number;
	teamScore: number;
	isAdmin?: boolean;
	isLive: boolean;
	isFinished: boolean;
	invert?: boolean;
	onAddScore: (player: string) => void;
	onSubtractScore: (player: string) => void;
}) {
	const {
		teamName,
		player1,
		player1Id,
		player2,
		player2Id,
		score1,
		score2,
		teamScore,
		isAdmin,
		isLive,
		isFinished,
		invert,
		onAddScore,
		onSubtractScore,
	} = props;
	return (
		<TeamMatchCardContainer $isLive={isLive} $isFinished={isFinished} $invert={invert}>
			<div className="team-data">
				<p className="team-name">{teamName}</p>
				<div className="team-player-wrapper">
					<p className="team-player">
						{invert ? score1 : player1} - {invert ? player1 : score1}
					</p>
					{isAdmin && (
						<div className="player-controls">
							<button className="player-control-button" onClick={() => onAddScore(player1Id)}>
								+
							</button>
							<button className="player-control-button" onClick={() => onSubtractScore(player1Id)}>
								-
							</button>
						</div>
					)}
				</div>
				<div className="team-player-wrapper">
					<p className="team-player">
						{invert ? score2 : player2} - {invert ? player2 : score2}
					</p>
					{isAdmin && (
						<div className="player-controls">
							<button className="player-control-button" onClick={() => onAddScore(player2Id)}>
								+
							</button>
							<button className="player-control-button" onClick={() => onSubtractScore(player2Id)}>
								-
							</button>
						</div>
					)}
				</div>
			</div>

			<p className="team-score">{teamScore}</p>
		</TeamMatchCardContainer>
	);
}
