import React, { useState, useEffect, useRef } from 'react'
import { Button, Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { currentTensesState, currentVerbsState, conjugationTables, ongoingGameState, tensesState, timerState } from './../../../Data/State';
import { shuffle, randElement } from './../../../utils';
import { d_pronouns } from '../../../Data/defaults'
import { RaceGameInfo, Verb } from '../../../Data/interfaces';
import { Navigate, useNavigate } from 'react-router-dom';
import ProgressBar from '../../../Components/ProgressBar/ProgressBar';

interface Props {
  maxStep: number;
}

const Race = () => {
  const currentVerbs = useRecoilValue(currentVerbsState)
  const tables = useRecoilValue(conjugationTables)
  const tenses = useRecoilValue(tensesState)
  const currentTenses = useRecoilValue(currentTensesState)
  const [ongoingGameInfo, setOngoingGameInfo] = useRecoilState(ongoingGameState)
  const resetOngoingGameInfo = useResetRecoilState(ongoingGameState)
  
  const [data, setData] = useState<RaceGameInfo[]>([])
  const navigate = useNavigate()
  const [progress, setProgress] = useRecoilState(timerState)

  useEffect(() => {
    resetOngoingGameInfo()
    if (currentVerbs.length > 0 && currentTenses.length > 0) {

      const verbTables = tables.filter(table => currentVerbs.includes(table.infinitif))
      let currentData = []
      for (var i = 0; i < ongoingGameInfo.maxStep; i++) {
        const stepTense: string = currentTenses[Math.floor(Math.random() * currentTenses.length)]
        console.log('🚀 ~ useEffect ~ stepTense', stepTense);

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
          console.log('🚀 ~ useEffect ~ currentTenses', currentTenses);
          visibleTenses = shuffle(currentTenses).slice(0, 3)
        }

        const stepVerbTable: Verb = randElement(verbTables) as Verb
        const vbs = stepVerbTable[stepTense as keyof Verb]
        let stepPronounsPos = -1
        let pronoun = ""
        let word = ""
        console.log('🚀 ~ useEffect ~ stepVerbTable', stepVerbTable);

        if (vbs !== undefined) {
          if (vbs instanceof Array) {
            console.log("this is an array")
            let maxxx = 0
            do {
              stepPronounsPos = Math.floor(Math.random() * 6)
              pronoun = d_pronouns[stepPronounsPos][0]
              word = vbs[stepPronounsPos]
              maxxx += 1
              console.log('🚀 ~ useEffect ~ maxxx', maxxx);
            } while (word === "" && maxxx < 6)
          } else {
            word = vbs
          }
        }
        console.log('🚀 ~ useEffect ~ word', word);
        const stepInfo = {
          pronoun,
          word,
          visibleTenses,
          stepTense
        }
        // some code
        currentData.push(stepInfo)
      }
      setData(currentData)
    }

    // const tensesTable = 
  }, [])

  const nextStep = (guess?: string) => {

    if (guess && guess === data[ongoingGameInfo.currentStep].stepTense) {

      setOngoingGameInfo(prev => ({...prev, score: prev.score + 100}))
    }
    if (ongoingGameInfo.currentStep >= ongoingGameInfo.maxStep - 1) {
      setOngoingGameInfo(prev => ({ ...prev, currentStep: 1 }))
      navigate("/pregame/race")      
    } else {
      setOngoingGameInfo(prev => ({...prev, currentStep: prev.currentStep + 1}))
    }
    setProgress(0)
    // setCurrentStep(prev => prev + 1)
  }

  return (
    <>{
      data.length > 0 ?
        <>
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ w: 200, h: 50, background: 'white', p: 5, mt: 10, mb: 5 }} >
              <Typography variant='body1' >{data[ongoingGameInfo.currentStep] && (data[ongoingGameInfo.currentStep].pronoun + " " + data[ongoingGameInfo.currentStep].word)}</Typography>
            </Box>
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', mt: 5, mb: 5 }}>
            <Button onClick={() => nextStep(data[ongoingGameInfo.currentStep].visibleTenses[0])} sx={{ background: '#9EF2E8', color: 'black' }} variant='contained'>
              {data[ongoingGameInfo.currentStep].visibleTenses[0]}
            </Button>
            <Button onClick={() => nextStep(data[ongoingGameInfo.currentStep].visibleTenses[1])} sx={{ background: '#F5D2D2', color: 'black' }} variant='contained'>
              {data[ongoingGameInfo.currentStep].visibleTenses[1]}
            </Button>
            <Button onClick={() => nextStep(data[ongoingGameInfo.currentStep].visibleTenses[2])} sx={{ background: '#E4DBFB', color: 'black' }} variant='contained'>
              {data[ongoingGameInfo.currentStep].visibleTenses[2]}
            </Button>
          </Container>
          <ProgressBar nextStep={nextStep} />
        </> :
        <>
          No data
        </>
    }
    </>
  )
}

export default Race