import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { config, useSpring } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import GameHeader from '../../../Components/GameHeader/GameHeader'
import ProgressBar from '../../../Components/ProgressBar/ProgressBar'
import {
  VerbToText,
  negatifEndgameSpriteMap,
  negatifEndgameKeys,
  positifEndgameSpriteMap,
  positifEndgameKeys
} from '../../../Data/defaults'
import { CompleteGameInfo, UpdateHeader, Verb } from '../../../Data/interfaces'
import { currentVerbsState, conjugationTables, currentTensesState, ongoingGameState, timerState } from '../../../Data/State'
import { findPronoun, randElement, shuffle } from '../../../utils'
import Score from '../Score/Score'
import { Input } from './styled'
import useSound from 'use-sound';
import negatifEndgame from '../../../Assets/interactif/negatifEndgame_mixdown.mp3'
import positifEndgame from '../../../Assets/interactif/positifEndgame_mixdown.mp3'

interface Correction {
  value: string;
  check: boolean;
}

const Complete = () => {
  const defaultCorrection = [{ value: '', check: false }, { value: '', check: false },
  { value: '', check: false }, { value: '', check: false }, { value: '', check: false }, { value: '', check: false }]
  const [data, setData] = useState<CompleteGameInfo[]>([])
  const [correction, setCorrection] = useState<Correction[]>(defaultCorrection)
  const currentVerbs = useRecoilValue(currentVerbsState)
  const tables = useRecoilValue(conjugationTables)
  const [showResult, setShowResult] = useState(false)
  const currentTenses = useRecoilValue(currentTensesState)
  const [ongoingGameInfo, setOngoingGameInfo] = useRecoilState(ongoingGameState)
  const [progress, setProgress] = useRecoilState(timerState)
  const [showScore, setShowScore] = useState(false)
  const [reset, setReset] = useState(true)
  const [headerData, updateHeaderData] = useState<UpdateHeader>({ update: false, target: 'step' })
  const [playNegatifEndgameSound] = useSound(negatifEndgame, { interrupt: true, sprite: negatifEndgameSpriteMap })
  const [playPositifEndgameSound] = useSound(positifEndgame, { interrupt: true, sprite: positifEndgameSpriteMap })

  useEffect(() => {
    resetGame()
  }, [])

  const handleClick = (e: any) => {
    // if (intervalId) {
    //     clearInterval(intervalId);
    //     setIntervalId(null);
    //     return;
    // }
    nextStep()
  };

  const getCorrection = () => {
    setCorrection(prev => prev.map(({ value, check }, idx) => {
      const n = value.toLowerCase() === data[ongoingGameInfo.currentStep - 1].stepTable[idx]
      return { value, check: n }
    }))
    let nscore = 0
    for (var i = 0; i < correction.length; i++) {
      nscore = nscore + (correction[i].value.toLowerCase() === data[ongoingGameInfo.currentStep - 1].stepTable[i] ? 1 : 0)
    }
    setOngoingGameInfo(prev => ({
      ...prev, score: prev.score + nscore * 10
    }))
  }

  const resetGame = () => {
    setOngoingGameInfo(prev => ({
      ...prev, currentStep: 1, score: 0
    }))
    setCorrection(defaultCorrection)
    const verbTables = tables.filter(table => currentVerbs.includes(table.infinitif))
    let currentData = []
    let maxScore = 0
    setOngoingGameInfo(prev => ({ ...prev, maxStep: currentTenses.length * currentVerbs.length }))
    for (var i = 0; i < currentVerbs.length; i++) {
      for (var j = 0; j < currentTenses.length; j++) {

        const stepTense: string = currentTenses[j]
        const stepVerb: string = currentVerbs[i]

        const cverb: Verb | undefined = tables.find(table => table.infinitif === stepVerb)
        const visiblePronouns: string[] = []

        if (cverb !== undefined) {
          const stepTable: string | string[] | undefined = cverb[stepTense as keyof Verb]
          if (stepTable !== undefined && Array.isArray(stepTable)) {
            stepTable.forEach((ele, pos) => {
              visiblePronouns.push(findPronoun(ele, pos))
            })
            const stepInfo = {
              stepVerb,
              stepTable,
              visiblePronouns,
              stepTense
            }
            // some code
            maxScore = maxScore + visiblePronouns.length
            currentData.push(stepInfo)
          } else console.log("just one word here")
        } else {
          console.log("this verb does not exist")
        }
      }
    }
    setOngoingGameInfo(prev => ({ ...prev, maxScore: maxScore * 10 }))
    currentData = shuffle(currentData)
    setData(currentData)
  }

  const updateHeader = (target: string) => {
    updateHeaderData(prev => ({ update: !prev.update, target }))
  }

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

  const nextStep = (guess?: string) => {
    updateHeader('step')
    getCorrection()
    setShowResult(true)
    updateHeader('score')

    setTimeout(() => {
      setShowResult(false)
      setCorrection(defaultCorrection)
    }, 2000);

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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, pos: number) => {
    const currentCorrection = [...correction]
    currentCorrection[pos].value = e.target.value
    setCorrection(currentCorrection)
  }


  return (
    <>{
      data.length > 0 ?
        <>
          <GameHeader update={headerData.update} target={headerData.target} />
          <Container sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
              <Typography variant='body1' sx={{ fontWeight: 'bold' }} >Verb:  </Typography>
              <Typography variant='body1' >{data[ongoingGameInfo.currentStep - 1] && (data[ongoingGameInfo.currentStep - 1].stepVerb)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
              <Typography variant='body1' sx={{ fontWeight: 'bold' }} >Temps:  </Typography>
              <Typography variant='body1' >{data[ongoingGameInfo.currentStep - 1] && VerbToText[data[ongoingGameInfo.currentStep - 1].stepTense as keyof typeof VerbToText]}</Typography>
            </Box>
          </Container>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ m: 2, flexWrap: 'wrap', maxWidth: 'md' }}
            alignItems='center'
            justifyContent='center'
          >
            {data[ongoingGameInfo.currentStep - 1].visiblePronouns.map((pronoun, pos) => {
              if (pronoun !== "") {
                return <Input
                  value={correction[pos].value}
                  onChange={(e: any) => handleValueChange(e, pos)}
                  correction={correction[pos].check ? '#caffbf' : '#ffadad'}
                  showresult={showResult}
                  id="filled-basic"
                  label={pronoun}
                  variant="filled"
                />
              } else return ""
            })}
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' sx={{ width: 100 }} color='secondary' onClick={handleClick}>Vérifier</Button>
          </Box>
          {!showScore && <ProgressBar nextStep={nextStep} />}
          <Score open={showScore} handleClose={handleClose} />
        </> :
        <>
          No data
        </>
    }
    </>
  )

}

export default Complete