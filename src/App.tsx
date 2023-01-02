import { Container } from '@mui/material';
import Breadcrumbs from './Components/Breadcrumbs/Breadcrumbs'
import React from 'react';
import { Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { router } from './Routes';
import { StyledContainer, StyledPaper, MainContainer } from './Styled';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';


function App() {
  return (
      <MainContainer>
        <Navbar />
        <Breadcrumbs />
        <StyledContainer maxWidth="xl" sx={{ mt: 1 }}>
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
