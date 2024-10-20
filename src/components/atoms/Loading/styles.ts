import styled, { keyframes } from 'styled-components';

export const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const SpinnerSVG = styled.svg`
  animation: ${rotate} 2s linear infinite;
`;