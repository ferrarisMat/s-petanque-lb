import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, type RootState } from './store/store';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Matches } from './pages/Matches';
import styled from 'styled-components';
import { GlobalStyle } from './styles';
import { initMatches, initTeams } from './store/slices/appSlice';
import { useEffect } from 'react';
import type React from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';

const AppContainer = styled.div`
	min-height: 100vh;
	overflow-x: hidden;
	padding: 0 24px;
	padding-top: 120px;
	padding-bottom: 80px;
`;

function AppInitializer({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const { teams, matches } = useAppSelector((state: RootState) => state.app);
	useEffect(() => {
		console.log('AppInitializer useEffect - dispatching initTeams');
		dispatch(initTeams());
	}, [dispatch]);

	useEffect(() => {
		if (teams.length > 0 && matches.length === 0) {
			console.log('Teams available, dispatching initMatches');
			dispatch(initMatches());
		}
	}, [teams.length, matches.length, dispatch]);

	return <>{children}</>;
}

function App() {
	return (
		<Provider store={store}>
			<AppInitializer>
				<Router>
					<GlobalStyle />
					<Navigation />
					<AppContainer>
						<Routes>
							<Route path="/s-petanque-lb/" element={<Home />} />
							<Route path="/s-petanque-lb/matches" element={<Matches />} />
							<Route path="/s-petanque-lb/admin" element={<Matches isAdmin />} />
						</Routes>
					</AppContainer>
					<Footer />
				</Router>
			</AppInitializer>
		</Provider>
	);
}

export default App;
