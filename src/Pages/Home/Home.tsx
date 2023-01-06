import React, { useEffect } from 'react';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentGameState, games } from '../../Data/State'
import { GameInfo } from '../../Data/interfaces';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';

const Home = () => {
  const currentGames = useRecoilValue(games)
  const [_, setCurrentGame] = useRecoilState(currentGameState)
  const navigate = useNavigate()

  const handleClick = (item: GameInfo) => {
    setCurrentGame(item)
    navigate("/pregame/")
  }

  return (
    <ImageList
      rowHeight={50}
      sx={{
        mb: 4,
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))!important'
      }}
      cols={3} gap={10}>
      {currentGames.map((item: GameInfo) => (
        <ImageListItem
          sx={{ height: '100% !important', cursor: "pointer" }}
          key={item.img}
          cols={item.cols}
          rows={item.rows}
          onClick={(e) => handleClick(item)}
        >
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={"difficulte: " + item.difficulty}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default Home