import React from 'react';
import Breadcrumbs from './Components/Breadcrumbs/Breadcrumbs'
import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { StyledContainer, StyledPaper, MainContainer } from './Styled';
import {DragDropContext, DropResult, OnDragEndResponder, ResponderProvided} from 'react-beautiful-dnd'


function App() {

  
  return (
    <MainContainer>
      <Navbar />
      <Breadcrumbs />
      <StyledContainer maxWidth="xl" sx={{ mt: 1 }}>
        <StyledPaper sx={{
          background: '#6e8898', p: 1, m: 1, mb: 2
        }}>
            <Outlet />
        </StyledPaper>
      </StyledContainer>
    </MainContainer>
  );
}

export default App;
