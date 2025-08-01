import styled from "styled-components";

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #1e293b;
  text-align: center;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  color: #64748b;
  line-height: 1.6;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  background: #f1f5f9;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
`;

export function About() {
  return (
    <AboutContainer>
      <Title>About This App</Title>
      <Content>
        <p>This is a simple React application demonstrating the integration of:</p>
        
        <FeatureList>
          <FeatureItem>
            <strong>React Router</strong> - For client-side routing and navigation
          </FeatureItem>
          <FeatureItem>
            <strong>Redux Toolkit</strong> - For state management with modern Redux patterns
          </FeatureItem>
          <FeatureItem>
            <strong>Styled Components</strong> - For CSS-in-JS styling with component-based styles
          </FeatureItem>
          <FeatureItem>
            <strong>TypeScript</strong> - For type safety and better developer experience
          </FeatureItem>
          <FeatureItem>
            <strong>Vite</strong> - For fast development and optimized builds
          </FeatureItem>
        </FeatureList>

        <p>
          The counter component demonstrates how Redux Toolkit works with TypeScript
          and styled-components for a complete modern React development experience.
        </p>
      </Content>
    </AboutContainer>
  );
}