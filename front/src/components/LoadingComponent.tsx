import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full viewport height
`;

const Loader = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-left-color: #007bff; // Customize the color as needed
  border-radius: 50%;
  width: 60px; // Customize size
  height: 60px; // Customize size
  animation: ${spin} 1s linear infinite;
`;

const LoadingComponent = () => {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
};

export default LoadingComponent;
