import { Container } from '@mui/material';
import React from 'react';
import { Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { router } from './Routes';
import { StyledContainer, StyledPaper, MainContainer } from './Styled';


function App() {
  return (
    <MainContainer>
      <Navbar />
      <StyledContainer maxWidth="xl">
        <StyledPaper sx={{
          background: '#6e8898', padding: '15px'
        }}>
          <Outlet />
        </StyledPaper>
      </StyledContainer>
    </MainContainer>
  );
}

export default App;
