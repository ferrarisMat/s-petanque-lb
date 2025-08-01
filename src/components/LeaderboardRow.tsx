import styled from 'styled-components';
import crownSvgUrl from '../assets/svg/crown.svg';
import { FONT_STYLES } from '../styles';

const LeaderboardRowContainer = styled.div<{ $rank: number }>`
	position: relative;
`;

const LeaderboardContent = styled.div<{ $rank: number; $isPlayer: boolean }>`
	display: grid;
	grid-template-columns: 48px 1fr ${({ $isPlayer }) => (!$isPlayer ? '60px 60px 60px 60px' : '60px')};
	gap: 16px;
	padding: 16px;
	align-items: center;
	${(props) => {
		switch (props.$rank) {
			case 1:
				return 'background-color: var(--color-gold-light); border: 3px solid var(--color-gold);';
			case 2:
				return 'background-color: var(--color-silver-light); border: 3px solid var(--color-silver);';
			case 3:
				return 'background-color: var(--color-bronze-light); border: 3px solid var(--color-bronze);';
			default:
				return 'background-color: var(--color-white); border: 1px solid var(--color-black);';
		}
	}};

	.rank-cell {
		display: flex;
		justify-content: center;
	}

	.team-cell {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.stat-cell {
		text-align: left;
	}

	.large-text,
	.small-text {
		${FONT_STYLES.medium}
	}
	.large-text {
		font-size: 18px;
	}
	.small-text {
		font-size: 12px;
	}
	.stat-text,
	.score-text {
		${FONT_STYLES.semibold}
	}
	.score-text {
		font-size: 24px;
	}

	.live-text {
		${FONT_STYLES.regular}
		font-size: 10px;
		color: var(--color-red);
		position: absolute;
		bottom: 8px;
		right: 8px;
		display: flex;
		align-items: baseline;
		gap: 4px;
		&::after {
			content: '';
			display: block;
			width: 4px;
			height: 4px;
			background-color: var(--color-red);
			top: 0;
			left: 0;
			border-radius: 50%;
		}
	}
`;

const LeaderboardRowRank = styled.div<{ $rank: number }>`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	${(props) => {
		switch (props.$rank) {
			case 1:
				return 'background-color: var(--color-gold);';
			case 2:
				return 'background-color: var(--color-silver);';
			case 3:
				return 'background-color: var(--color-bronze);';
			default:
				return 'background-color: var(--color-white); border: 1px solid var(--color-black);';
		}
	}}
`;

const LeaderboardLegend = styled.small`
	${FONT_STYLES.regular}
	font-size: 12px;
	color: var(--color-black);
	white-space: nowrap;
`;

const CrownIcon = styled.img`
	position: absolute;
	top: -24px;
	right: -24px;
	width: 48px;
	transform: rotate(30deg);
	z-index: 10;
`;

const LeaderboardLegendRow = styled.div<{ $isPlayer: boolean }>`
	display: grid;
	grid-template-columns: 48px 1fr ${({ $isPlayer }) => (!$isPlayer ? '60px 60px 60px 60px' : '60px')};
	gap: 16px;
	padding: 0 21px;
	padding-bottom: 6px;
	align-items: center;

	.legend-rank,
	.legend-team {
		text-align: left;
	}

	.legend-stat {
		text-align: left;
		white-space: nowrap;
	}
`;

export function LeaderboardRow(props: {
	teamName: string;
	players?: string[];
	player?: string;
	played?: number;
	wins?: number;
	losses?: number;
	points: number;
	isLive?: boolean;
	isPlayer?: boolean;
	rank: number;
}) {
	const { rank, teamName, players, player, played, wins, losses, points, isLive, isPlayer } = props;

	return (
		<LeaderboardRowContainer $rank={rank}>
			{rank === 1 && (
				<LeaderboardLegendRow $isPlayer={isPlayer ?? false}>
					<LeaderboardLegend className="legend-rank">Rank</LeaderboardLegend>
					<LeaderboardLegend className="legend-team">{isPlayer ? 'Player' : 'Team'}</LeaderboardLegend>
					{!isPlayer && (
						<>
							<LeaderboardLegend className="legend-stat">Played</LeaderboardLegend>
							<LeaderboardLegend className="legend-stat">Won</LeaderboardLegend>
							<LeaderboardLegend className="legend-stat">Lost</LeaderboardLegend>
						</>
					)}
					<LeaderboardLegend className="legend-stat">Points</LeaderboardLegend>
				</LeaderboardLegendRow>
			)}
			<LeaderboardContent $rank={rank} $isPlayer={isPlayer ?? false}>
				{rank === 1 && <CrownIcon src={crownSvgUrl} alt="Crown" />}
				<div className="rank-cell">
					<LeaderboardRowRank $rank={rank}>{rank}</LeaderboardRowRank>
				</div>
				<div className="team-cell">
					<p className="large-text">{isPlayer && player ? player : teamName}</p>
					<p className="small-text">{Array.isArray(players) && !isPlayer ? players.join(' • ') : teamName}</p>
				</div>
				{!isPlayer && (
					<>
						<p className="large-text stat-cell">{played}</p>
						<p className="large-text stat-cell">{wins}</p>
						<p className="large-text stat-cell">{losses}</p>
					</>
				)}
				<p className="score-text stat-cell">{points}</p>
				{isLive && <p className="live-text">Now playing</p>}
			</LeaderboardContent>
		</LeaderboardRowContainer>
	);
}
