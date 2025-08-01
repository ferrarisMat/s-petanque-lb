import styled from 'styled-components';
import { useState } from 'react';
import { LeaderboardRow } from '../components/LeaderboardRow';
import { Switcher } from '../components/Switcher';
import { useAppSelector } from '../store/hooks';
import type { RootState } from '../store/store';

const HomeContainer = styled.div`
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
`;

export function Home() {
	const switcherOptions = ['Teams', 'Players'];
	const [activeView, setActiveView] = useState(switcherOptions[0]);
	const { teams, players, matches } = useAppSelector((state: RootState) => state.app);

	const liveMatches = matches.filter((match) => match.isLive);

	return (
		<HomeContainer>
			<div className="grid-container">
				<Switcher options={switcherOptions} activeOption={activeView} onOptionChange={setActiveView} />
			</div>
			<div className="grid-container">
				<div className="center-wrapper">
					{activeView === switcherOptions[0] && (
						<>
							{teams.length > 0 &&
								[...teams]
									.sort((a, b) => b.points - a.points)
									.map((team, index) => (
										<LeaderboardRow
											key={team.id}
											rank={index + 1}
											teamName={team.name}
											players={team.players.map((player) => player.name)}
											played={team.played}
											wins={team.won}
											losses={team.lost}
											points={team.points}
											isLive={liveMatches.some((match) => match.team1 === team.id || match.team2 === team.id)}
										/>
									))}
						</>
					)}
					{activeView === switcherOptions[1] && (
						<>
							{players.length > 0 &&
								[...players]
									.sort((a, b) => b.score - a.score)
									.map((player, index) => (
										<LeaderboardRow
											key={player.id}
											teamName={teams.find((team) => team.players.some((p) => p.id === player.id))?.name ?? ''}
											rank={index + 1}
											player={player.name}
											points={player.score}
											isPlayer
										/>
									))}
						</>
					)}
				</div>
			</div>
		</HomeContainer>
	);
}
