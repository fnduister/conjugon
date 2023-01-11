import React, { useState, useEffect } from 'react'
import { Stack, Button, Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentTensesState, currentVerbsState, conjugationTables, ongoingGameState, tensesState, timerState } from './../../../Data/State';
import { shuffle, randElement, findPronoun } from './../../../utils';
import { RaceGameInfo, UpdateHeader, Verb } from '../../../Data/interfaces';
import ProgressBar from '../../../Components/ProgressBar/ProgressBar';
import Score from '../Score/Score';
import { useSpring, animated, config } from '@react-spring/web';
import GameHeader from '../../../Components/GameHeader/GameHeader';
import {
  negatifKeys,
  negatifSpriteMap,
  negatifEndgameSpriteMap,
  negatifEndgameKeys,
  positifEndgameSpriteMap,
  positifSpriteMap,
  positifEndgameKeys,
  positifKeys,
  VerbToText
} from '../../../Data/defaults'
import negatifEndgame from '../../../Assets/interactif/negatifEndgame_mixdown.mp3'
import positifEndgame from '../../../Assets/interactif/positifEndgame_mixdown.mp3'
import negatif from '../../../Assets/interactif/negatif1.mp3'
import positif from '../../../Assets/interactif/positif1_mixdown.mp3'
import useSound from 'use-sound';
import { SpriteMap } from 'use-sound/dist/types';


const Race = () => {
  const currentVerbs = useRecoilValue(currentVerbsState)
  const tables = useRecoilValue(conjugationTables)
  // const [positifAudio, togglePositifAudio] = useAudio(positifIngame1)
  // const [playingSound, toggleAudi] = useAudio(audi)
  const [playNegatifSound] = useSound(negatif, { interrupt: true, sprite: negatifSpriteMap as SpriteMap })
  const [playPositifSound] = useSound(positif, { interrupt: true, sprite: positifSpriteMap as SpriteMap })
  const [playNegatifEndgameSound] = useSound(negatifEndgame, { interrupt: true, sprite: negatifEndgameSpriteMap as SpriteMap} )
  const [playPositifEndgameSound] = useSound(positifEndgame, { interrupt: true, sprite: positifEndgameSpriteMap as SpriteMap} )

  const tenses = useRecoilValue(tensesState)
  const currentTenses = useRecoilValue(currentTensesState)
  const [ongoingGameInfo, setOngoingGameInfo] = useRecoilState(ongoingGameState)
  const [data, setData] = useState<RaceGameInfo[]>([])
  const [progress, setProgress] = useRecoilState(timerState)
  const [showScore, setShowScore] = useState(false)
  const [reset, setReset] = useState(true)
  const [headerData, updateHeaderData] = useState<UpdateHeader>({ update: false, target: 'step' })
  const AnimatedBox = animated(Box);

  const [props, api] = useSpring(() => ({
    background: 'white',
    width: 300,
    justifyContent: 'center',
    display: 'flex',
    padding: 5,
    marginTop: 15,
    alignItems: 'center',
    height: 100,
    config: config.molasses,
  }))


  useEffect(() => {
    if (currentVerbs.length > 0 && currentTenses.length > 0) {
      resetGame()
    }
    // const tensesTable = 
  }, [])

  const showScoreOverlay = () => {
    setOngoingGameInfo(prev => ({ ...prev, isOn: false }))
    if (Math.floor(ongoingGameInfo.score / ongoingGameInfo.maxScore * 100) > 50) {
      playPositifEndgameSound({id: randElement(positifEndgameKeys)})
    } else {
      playNegatifEndgameSound({id: randElement(negatifEndgameKeys)})
    }
    setShowScore(true)
    setReset(false)
  }

  const resetGame = () => {
    setOngoingGameInfo(prev => ({
      ...prev, currentStep: 1, score: 0
    }))

    const verbTables = tables.filter(table => currentVerbs.includes(table.infinitif))
    let currentData = []
    let maxScore = 0
    for (var i = 0; i < ongoingGameInfo.maxStep; i++) {
      const stepTense: string = currentTenses[Math.floor(Math.random() * currentTenses.length)]

      // get the possible tenses, we want at least 2 of the tense selected and the reset is random
      let visibleTenses: string[] = []
      const leftTenses = tenses.filter(tense => !currentTenses.includes(tense))

      if (currentTenses.length < 3) {
        visibleTenses = [...currentTenses]
        for (var j = 0; j < (3 - currentTenses.length); j++) {
          visibleTenses.push(randElement(leftTenses, currentTenses.length))
        }
        visibleTenses = shuffle(visibleTenses)
      } else {
        visibleTenses = shuffle(currentTenses).slice(0, 3)
      }

      const stepVerbTable: Verb = randElement(verbTables) as Verb
      const vbs = stepVerbTable[stepTense as keyof Verb]
      let stepPronounsPos = -1
      let pronoun = ""
      let word = ""

      if (vbs !== undefined) {
        if (vbs instanceof Array) {
          let maxxx = 0
          do {
            stepPronounsPos = Math.floor(Math.random() * 6)
            word = vbs[stepPronounsPos]
            pronoun = findPronoun(word, stepPronounsPos)
            maxxx += 1
          } while (word === "" && maxxx < 6)
        } else {
          word = vbs
        }
      }
      const stepInfo = {
        pronoun,
        word,
        visibleTenses,
        stepTense
      }
      // some code
      maxScore = maxScore + 1

      currentData.push(stepInfo)
    }
    setOngoingGameInfo(prev => ({ ...prev, maxScore: maxScore * 100 }))
    setData(currentData)
  }

  const updateHeader = (target: string) => {
    updateHeaderData(prev => ({ update: !prev.update, target }))
  }

  const nextStep = (guess?: string) => {
    updateHeader('step')
    if (guess && guess === data[ongoingGameInfo.currentStep - 1].stepTense) {
      playPositifSound({ id: randElement(positifKeys) })
      updateHeader('score');
      api.start({
        from: {
          background: 'green',
          width: 330,
          height: 130
        },
        to: {
          background: 'white',
          width: 300,
          height: 100,
        },
      })
      setOngoingGameInfo(prev => ({ ...prev, score: prev.score + 100 }))
    } else {
      playNegatifSound({ id: randElement(negatifKeys) })
      api.start({
        from: {
          background: 'red',
          width: 330,
          height: 130,
        },
        to: {
          background: 'white',
          width: 300,
          height: 100,
        },
      })
    }
    if (ongoingGameInfo.currentStep >= ongoingGameInfo.maxStep) {
      setTimeout(() => { showScoreOverlay() }, 1500);
    } else {
      setOngoingGameInfo(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))
    }
    setProgress(0)
    // setCurrentStep(prev => prev + 1)
  }

  const handleClose = () => {
    setShowScore(false)
    resetGame()
  }

  return (
    <>{
      data.length > 0 ?
        <>
          <GameHeader update={headerData.update} target={headerData.target} />
          <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 10 }}>
            <AnimatedBox style={props}>
              <Typography variant='body1' >{data[ongoingGameInfo.currentStep - 1] && (data[ongoingGameInfo.currentStep - 1].pronoun + " " + data[ongoingGameInfo.currentStep - 1].word)}</Typography>
            </AnimatedBox>
          </Container>
          <Stack justifyContent='center' alignItems='center' direction={{ xs: "column", sm: 'row' }}>
            <Button onClick={() => nextStep(data[ongoingGameInfo.currentStep - 1].visibleTenses[0])} color="secondary" sx={{ m: 1 }} variant='contained'>
              {VerbToText[data[ongoingGameInfo.currentStep - 1].visibleTenses[0] as keyof typeof VerbToText]}
            </Button>
            <Button onClick={() => nextStep(data[ongoingGameInfo.currentStep - 1].visibleTenses[1])} color="secondary" sx={{ m: 1 }} variant='contained'>
              {VerbToText[data[ongoingGameInfo.currentStep - 1].visibleTenses[1] as keyof typeof VerbToText]}
            </Button>
            <Button onClick={() => nextStep(data[ongoingGameInfo.currentStep - 1].visibleTenses[2])} color="secondary" sx={{ m: 1 }} variant='contained'>
              {VerbToText[data[ongoingGameInfo.currentStep - 1].visibleTenses[2] as keyof typeof VerbToText]}
            </Button>
          </Stack>
          {(!showScore && ongoingGameInfo.maxTime !== 0 ) && <ProgressBar nextStep={nextStep} />}
          <Score open={showScore} handleClose={handleClose} />
        </> :
        <>
          No data
        </>
    }
    </>
  )
}

export default Race