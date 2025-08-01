import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Types
interface Player {
	id: string;
	name: string;
	score: number;
}

interface Team {
	id: string;
	name: string;
	players: Player[];
	played: number;
	won: number;
	lost: number;
	points: number;
}

interface Match {
	id: string;
	team1: string;
	team2: string;
	score1: number;
	score2: number;
	isLive: boolean;
	isFinished: boolean;
	playerScores: { [playerId: string]: number };
	winnerId?: string;
	leadingTeamId?: string;
}

interface AppState {
	teams: Team[];
	players: Player[];
	matches: Match[];
}

// State
const initialState: AppState = {
	teams: [],
	players: [
		{
			id: 'player-1',
			name: 'Nicklas',
			score: 0,
		},
		{
			id: 'player-2',
			name: 'Christoffer',
			score: 0,
		},
		{
			id: 'player-3',
			name: 'Johan',
			score: 0,
		},
		{
			id: 'player-4',
			name: 'Sarah',
			score: 0,
		},
		{
			id: 'player-5',
			name: 'Jane',
			score: 0,
		},
		{
			id: 'player-6',
			name: 'Marie',
			score: 0,
		},
	],
	matches: [],
};

// Helper functions
const findTeamById = (state: AppState, teamId: string) => 
	state.teams.find(team => team.id === teamId);

const findPlayerById = (state: AppState, playerId: string) => 
	state.players.find(player => player.id === playerId);

const updateMatchLeader = (state: AppState, match: Match) => {
	const newScore1 = match.score1;
	const newScore2 = match.score2;
	const previousLeader = match.leadingTeamId;
	let newLeader: string | undefined;
	
	// Determine current leader
	if (newScore1 > newScore2) {
		newLeader = match.team1;
	} else if (newScore2 > newScore1) {
		newLeader = match.team2;
	} else {
		newLeader = undefined; // Tied
	}
	
	// Update points if leader changed
	if (previousLeader !== newLeader) {	
		// Remove points from previous leader
		if (previousLeader) {
			const prevLeaderTeam = findTeamById(state, previousLeader);
			if (prevLeaderTeam) {
				prevLeaderTeam.points -= 3;
			}
		}
		
		// Add points to new leader
		if (newLeader) {
			const newLeaderTeam = findTeamById(state, newLeader);
			if (newLeaderTeam) {
				newLeaderTeam.points += 3;
			}
		}
		
		// Update match leader
		match.leadingTeamId = newLeader;
	}
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		initTeams: (state) => {
			const teams = [];
			// Generate teams based on players, 2 players per team
			for (let i = 0; i < state.players.length; i += 2) {
				// Use references to the same player objects, not copies
				const teamPlayers = [state.players[i], state.players[i + 1]].filter(Boolean);
				teams.push({ 
					id: `team-${i / 2 + 1}`, 
					name: `Team ${i / 2 + 1}`, 
					players: teamPlayers, 
					played: 0, 
					won: 0, 
					lost: 0, 
					points: 0 
				});
			}

			state.teams = teams;
		},
		initMatches: (state) => {
			const matches = [];
			let matchId = 1;			

			// Round-robin algorithm: every team plays against every other team exactly once
			for (let i = 0; i < state.teams.length; i++) {
				for (let j = i + 1; j < state.teams.length; j++) {
					const team1 = state.teams[i];
					const team2 = state.teams[j];
					
					// Initialize player scores for this match
					const playerScores: { [playerId: string]: number } = {};
					team1.players.forEach(player => playerScores[player.id] = 0);
					team2.players.forEach(player => playerScores[player.id] = 0);
					
					matches.push({
						id: `match-${matchId}`,
						team1: team1.id,
						team2: team2.id,
						score1: 0,
						score2: 0,
						isLive: false,
						isFinished: false,
						playerScores: playerScores,
						winnerId: undefined,
						leadingTeamId: undefined,
					});
					matchId++;
				}
			}
			state.matches = matches;
		},
		startMatch: (state, action: PayloadAction<string>) => {
			// TODO: Implement this
			const matchId = action.payload;
			const match = state.matches.find((match) => match.id === matchId);
			if (!match) return;

			match.isLive = true;
			const team1 = findTeamById(state, match.team1);
			const team2 = findTeamById(state, match.team2);
			
			if (team1) team1.played++;
			if (team2) team2.played++;
		},
		finishMatch: (state, action: PayloadAction<{matchId: string, winnerId: string}>) => {
			const {matchId, winnerId} = action.payload;
			const match = state.matches.find((match) => match.id === matchId);
			if (!match) return;

			if (match.leadingTeamId) {
				const leadingTeam = findTeamById(state, match.leadingTeamId);
				if (leadingTeam) {
					leadingTeam.points -= 3;
				}
			}
			
			// Update match state
			match.isFinished = true;
			match.isLive = false;
			match.winnerId = winnerId;
			match.leadingTeamId = undefined;
			
			// Update team stats and add permanent points
			const winner = findTeamById(state, winnerId);
			const loser = findTeamById(state, winnerId === match.team1 ? match.team2 : match.team1);
			
			if (winner) {
				winner.won++;
				winner.points += 3
			}
			if (loser) {
				loser.lost++;
			}
		},
		addScore: (state, action: PayloadAction<{ matchId: string; teamId: string; score: number; playerId: string }>) => {
			const { matchId, teamId, score, playerId } = action.payload;
			const match = state.matches.find((match) => match.id === matchId);
			if (!match) return;

			const currentTeamScore = teamId === match.team1 ? match.score1 : match.score2;
			const team = findTeamById(state, teamId);
			const currentPlayerSum = team?.players.reduce((sum, player) => 
				sum + (match.playerScores[player.id] || 0), 0) || 0;
			
			// Check if adding the score would exceed limits
			if (currentTeamScore + score <= 13 && currentPlayerSum + score <= 13) {
				// Update scores
				match.playerScores[playerId] = (match.playerScores[playerId] || 0) + score;
				if (teamId === match.team1) {
					match.score1 += score;
				} else {
					match.score2 += score;
				}
				
				// Update global player score
				const player = findPlayerById(state, playerId);
				if (player) {
					player.score += score;
				}
				
				// Only update match leader for unfinished matches
				if (!match.isFinished) {
					updateMatchLeader(state, match);
				}
			}
		},
		subtractScore: (state, action: PayloadAction<{ matchId: string; teamId: string; score: number; playerId: string }>) => {
			const { matchId, teamId, score, playerId } = action.payload;
			const match = state.matches.find((match) => match.id === matchId);
			if (!match) return;

			const currentTeamScore = teamId === match.team1 ? match.score1 : match.score2;
			const currentPlayerScore = match.playerScores[playerId] || 0;
			
			// Only subtract if we won't go below 0
			if (currentTeamScore >= score && currentPlayerScore >= score) {
				// Update scores
				match.playerScores[playerId] -= score;
				if (teamId === match.team1) {
					match.score1 -= score;
				} else {
					match.score2 -= score;
				}
				
				// Update global player score
				const player = findPlayerById(state, playerId);
				if (player && player.score >= score) {
					player.score -= score;
				}
				
				// Only update match leader for unfinished matches
				if (!match.isFinished) {
					updateMatchLeader(state, match);
				}
			}
		},
		unfinishMatch: (state, action: PayloadAction<string>) => {
			const matchId = action.payload;
			const match = state.matches.find((match) => match.id === matchId);
			if (!match || !match.winnerId) return;

			match.isFinished = false;
			
			const winner = findTeamById(state, match.winnerId);
			const loser = findTeamById(state, match.winnerId === match.team1 ? match.team2 : match.team1);
			
			if (winner) {
				winner.won--;
				winner.points -= 3;
			}
			if (loser) {
				loser.lost--;
			}
			
			match.winnerId = undefined;
			match.leadingTeamId = undefined;
			
			const score1 = match.score1;
			const score2 = match.score2;
			
			if (score1 > score2) {
				// Team 1 is leading
				match.leadingTeamId = match.team1;
				const team1 = findTeamById(state, match.team1);
				if (team1) {
					// Add temporary leading points
					team1.points += 3;
				}
			} else if (score2 > score1) {
				// Team 2 is leading
				match.leadingTeamId = match.team2;
				const team2 = findTeamById(state, match.team2);
				if (team2) {
					// Add temporary leading points
					team2.points += 3; 
				}
			}
		},
	},
});

export const { initTeams, initMatches, startMatch, finishMatch, addScore, subtractScore, unfinishMatch } = appSlice.actions;

export default appSlice.reducer;
