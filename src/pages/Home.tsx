import styled from 'styled-components';
import { Counter } from '../components/Counter';

const HomeContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem;
`;

const Title = styled.h1`
	color: #1e293b;
	text-align: center;
	margin-bottom: 2rem;
`;

const Description = styled.p`
	text-align: center;
	color: #64748b;
	margin-bottom: 3rem;
	font-size: 1.1rem;
`;

export function Home() {
	return (
		<HomeContainer>
			<Title>React + Redux + Styled Components</Title>
			<Description>A simple React app with React Router, Redux Toolkit, and styled-components.</Description>
			<Counter />
		</HomeContainer>
	);
}
