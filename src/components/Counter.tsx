import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { increment, decrement, incrementByAmount, reset } from "../store/slices/counterSlice";

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  max-width: 400px;
  margin: 0 auto;
`;

const CounterValue = styled.h2`
  font-size: 2rem;
  color: #1e293b;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:active {
    background-color: #1d4ed8;
  }
`;

const ResetButton = styled(Button)`
  background-color: #ef4444;

  &:hover {
    background-color: #dc2626;
  }

  &:active {
    background-color: #b91c1c;
  }
`;

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <CounterContainer>
      <CounterValue>Count: {count}</CounterValue>
      <ButtonGroup>
        <Button onClick={() => dispatch(increment())}>+1</Button>
        <Button onClick={() => dispatch(decrement())}>-1</Button>
        <Button onClick={() => dispatch(incrementByAmount(5))}>+5</Button>
        <ResetButton onClick={() => dispatch(reset())}>Reset</ResetButton>
      </ButtonGroup>
    </CounterContainer>
  );
}