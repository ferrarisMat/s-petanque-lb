import styled from 'styled-components';
import { TeamMatchCard } from '../components/TeamMatchCard';
import { FONT_STYLES } from '../styles';
import { useAppSelector } from '../store/hooks';
import type { RootState } from '../store/store';
import { useAppDispatch } from '../store/hooks';
import { addScore, subtractScore, finishMatch, unfinishMatch } from '../store/slices/appSlice';

const MathesContainer = styled.div`
	margin-top: 80px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32px;
	@media screen and (max-width: 1200px) {
		margin-top: 64px;
	}
	@media screen and (max-width: 900px) {
		margin-top: 48px;
	}
	@media screen and (max-width: 480px) {
		margin-top: 32px;
	}
	.match-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 24px;
		row-gap: 8px;
		@media screen and (max-width: 480px) {
			column-gap: 16px;
		}
	}
	.table-title {
		${FONT_STYLES.medium}
		font-size: 16px;
		margin-bottom: 16px;
		text-align: center;
	}
`;

export function Matches(props: { isAdmin?: boolean }) {
	const { isAdmin } = props;
	const { matches, teams } = useAppSelector((state: RootState) => state.app);

	const finishedMatches = matches.filter((match) => match.isFinished);

	const otherMatches = matches
		.filter((match) => !match.isFinished)
		.sort((a, b) => {
			if (a.isLive === b.isLive) return 0;
			return a.isLive ? -1 : 1;
		});

	const dispatch = useAppDispatch();

	const handleAddScore = (matchId: string, teamId: string, playerId: string) => {
		const match = matches.find((m) => m.id === matchId);
		if (!match || match.isFinished) return;

		// Check current scores before updating
		const currentTeamScore = teamId === match.team1 ? match.score1 : match.score2;
		const team = teams.find((t) => t.id === teamId);
		const currentPlayerSum = team?.players.reduce((sum, player) => sum + (match.playerScores[player.id] || 0), 0) || 0;

		// Only proceed if adding 1 won't exceed limits
		if (currentTeamScore + 1 <= 13 && currentPlayerSum + 1 <= 13) {
			dispatch(addScore({ matchId, teamId, score: 1, playerId }));

			// If this score update reaches 13, finish the match
			if (currentTeamScore + 1 === 13) {
				dispatch(finishMatch({ matchId, winnerId: teamId }));
			}
		}
	};

	const handleSubtractScore = (matchId: string, teamId: string, playerId: string) => {
		const match = matches.find((m) => m.id === matchId);
		if (!match) return;

		// Get current scores before updating
		const currentTeamScore = teamId === match.team1 ? match.score1 : match.score2;
		const currentPlayerScore = match.playerScores[playerId] || 0;

		// Only proceed if we can subtract without going below 0
		if (currentTeamScore >= 1 && currentPlayerScore >= 1) {
			dispatch(subtractScore({ matchId, teamId, score: 1, playerId }));

			// If match is finished and this subtraction would bring the team below 13, unfinish the match
			if (match.isFinished && currentTeamScore - 1 < 13) {
				dispatch(unfinishMatch(matchId));
			}
		}
	};

	return (
		<MathesContainer>
			<div className="grid-container">
				{otherMatches.length > 0 && (
					<div className="center-wrapper">
						<p className="table-title">Table</p>
						<div className="match-row">
							{otherMatches
								.map((match) => {
									const team1 = teams.find((team) => team.id === match.team1);
									const team2 = teams.find((team) => team.id === match.team2);

									return [
										// Team 1 Card
										<TeamMatchCard
											key={`${match.id}-team1`}
											teamName={team1?.name ?? ''}
											score1={match.playerScores[team1?.players[0]?.id ?? ''] ?? 0}
											score2={match.playerScores[team1?.players[1]?.id ?? ''] ?? 0}
											player1={team1?.players[0]?.name ?? ''}
											player2={team1?.players[1]?.name ?? ''}
											player1Id={team1?.players[0]?.id ?? ''}
											player2Id={team1?.players[1]?.id ?? ''}
											teamScore={match.score1}
											isAdmin={isAdmin}
											isLive={match.isLive}
											isFinished={match.isFinished}
											onAddScore={(playerId) => {
												handleAddScore(match.id, match.team1, playerId);
											}}
											onSubtractScore={(playerId) => {
												handleSubtractScore(match.id, match.team1, playerId);
											}}
										/>,
										// Team 2 Card
										<TeamMatchCard
											key={`${match.id}-team2`}
											teamName={team2?.name ?? ''}
											score1={match.playerScores[team2?.players[0]?.id ?? ''] ?? 0}
											score2={match.playerScores[team2?.players[1]?.id ?? ''] ?? 0}
											player1={team2?.players[0]?.name ?? ''}
											player2={team2?.players[1]?.name ?? ''}
											player1Id={team2?.players[0]?.id ?? ''}
											player2Id={team2?.players[1]?.id ?? ''}
											teamScore={match.score2}
											isAdmin={isAdmin}
											isLive={match.isLive}
											isFinished={match.isFinished}
											invert
											onAddScore={(playerId) => {
												handleAddScore(match.id, match.team2, playerId);
											}}
											onSubtractScore={(playerId) => {
												handleSubtractScore(match.id, match.team2, playerId);
											}}
										/>,
									];
								})
								.flat()}
						</div>
					</div>
				)}
				{finishedMatches.length > 0 && (
					<div className="center-wrapper">
						<p className="table-title">Past games</p>
						<div className="match-row">
							{finishedMatches
								.map((match) => {
									const team1 = teams.find((team) => team.id === match.team1);
									const team2 = teams.find((team) => team.id === match.team2);

									return [
										// Team 1 Card
										<TeamMatchCard
											key={`${match.id}-team1`}
											teamName={team1?.name ?? ''}
											score1={match.playerScores[team1?.players[0]?.id ?? ''] ?? 0}
											score2={match.playerScores[team1?.players[1]?.id ?? ''] ?? 0}
											player1={team1?.players[0]?.name ?? ''}
											player2={team1?.players[1]?.name ?? ''}
											player1Id={team1?.players[0]?.id ?? ''}
											player2Id={team1?.players[1]?.id ?? ''}
											teamScore={match.score1}
											isAdmin={isAdmin}
											isLive={match.isLive}
											isFinished={match.isFinished}
											onAddScore={(playerId) => {
												handleAddScore(match.id, match.team1, playerId);
											}}
											onSubtractScore={(playerId) => {
												handleSubtractScore(match.id, match.team1, playerId);
											}}
										/>,
										// Team 2 Card
										<TeamMatchCard
											key={`${match.id}-team2`}
											teamName={team2?.name ?? ''}
											score1={match.playerScores[team2?.players[0]?.id ?? ''] ?? 0}
											score2={match.playerScores[team2?.players[1]?.id ?? ''] ?? 0}
											player1={team2?.players[0]?.name ?? ''}
											player2={team2?.players[1]?.name ?? ''}
											player1Id={team2?.players[0]?.id ?? ''}
											player2Id={team2?.players[1]?.id ?? ''}
											teamScore={match.score2}
											isAdmin={isAdmin}
											isLive={match.isLive}
											isFinished={match.isFinished}
											invert
											onAddScore={(playerId) => {
												handleAddScore(match.id, match.team2, playerId);
											}}
											onSubtractScore={(playerId) => {
												handleSubtractScore(match.id, match.team2, playerId);
											}}
										/>,
									];
								})
								.flat()}
						</div>
					</div>
				)}
			</div>
		</MathesContainer>
	);
}
