import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DropItem } from './DropItem';
import DropArea from './DropArea';
import { MoveMeGameInfo, VerbProps } from './../../../Data/interfaces';
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
// import { Input } from './styled'
import useSound from 'use-sound';
import negatifEndgame from '../../../Assets/interactif/negatifEndgame_mixdown.mp3'
import positifEndgame from '../../../Assets/interactif/positifEndgame_mixdown.mp3'
import { typography } from '@mui/system';

const MoveMe = () => {
  const [data, setData] = useState<MoveMeGameInfo[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)

  const defaultCorrection: boolean[] = [false, false, false, false, false, false]
  const [correction, setCorrection] = useState<boolean[]>(defaultCorrection)
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

  const moveItem = (item: VerbProps, newPos: number) => {
    let modifiedWords = data[ongoingGameInfo.currentStep - 1].stepTable.map((ele, i) => {
      if (i === newPos) {
        return { pos: ele.pos, name: item.name }
      } else if (i === item.pos) {
        return { pos: item.pos, name: data[ongoingGameInfo.currentStep - 1].stepTable[newPos].name }
      }
      return ele
    });
    const lmodifiedWords = data.map((ele, i) => {
      if (ongoingGameInfo.currentStep - 1 === i) {
        return { ...ele, stepTable: modifiedWords }
      } return ele
    })
    setData(lmodifiedWords)
  }

  useEffect(() => {
    resetGame()
  }, [])

  const handleClick = (e: any) => {
    nextStep()
  };


  const resetGame = () => {
    setOngoingGameInfo(prev => ({
      ...prev, currentStep: 1, score: 0
    }))
    setCorrection(defaultCorrection)
    let currentData = []
    let maxScore = 0
    setOngoingGameInfo(prev => ({ ...prev, maxStep: currentTenses.length * currentVerbs.length }))
    for (var i = 0; i < currentVerbs.length; i++) {
      for (var j = 0; j < currentTenses.length; j++) {

        const stepTense: string = currentTenses[j]
        const stepVerb: string = currentVerbs[i]
        const finishingTable: VerbProps[] = []
        const cverb: Verb | undefined = tables.find(table => table.infinitif === stepVerb)
        const visiblePronouns: string[] = []

        if (cverb !== undefined) {
          const stepTable: string | string[] | undefined = cverb[stepTense as keyof Verb]
          if (stepTable !== undefined && Array.isArray(stepTable)) {
            stepTable.forEach((ele, pos) => {
              visiblePronouns.push(findPronoun(ele, pos))
            })

            shuffle(stepTable).forEach((ele, pos) => {
              finishingTable.push({ pos, name: ele })
            })

            const stepInfo = {
              stepVerb,
              stepTable: finishingTable,
              correction: stepTable,
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
    console.log('🚀 ~ resetGame ~ currentData', currentData);
    setData(currentData)
  }


  const handleClose = () => {
    setShowScore(false)
    resetGame()
  }

  const getCorrection = () => {
    let nscore = 0
    for (var i: number = 0; i < correction.length; i++) {
      if (data[ongoingGameInfo.currentStep - 1].correction[i].toLowerCase() === data[ongoingGameInfo.currentStep - 1].stepTable[i].name.toLowerCase()) {
        nscore++
      }
    }
    setOngoingGameInfo(prev => ({
      ...prev, score: prev.score + nscore * 10
    }))
  }

  const updateHeader = (target: string) => {
    updateHeaderData(prev => ({ update: !prev.update, target }))
  }

  const nextStep = (guess?: string) => {
    updateHeader('step')
    getCorrection()
    setShowResult(true)
    updateHeader('score')

    setTimeout(() => {
      setShowResult(false)

      if (ongoingGameInfo.currentStep >= ongoingGameInfo.maxStep) {
        setTimeout(() => { showScoreOverlay() }, 1500);
      } else {
        setOngoingGameInfo(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))
      }
      setProgress(0)
    }, 2000);
    // setCurrentStep(prev => prev + 1)
  }

  const showScoreOverlay = () => {
    setOngoingGameInfo(prev => ({ ...prev, isOn: false }))
    if (Math.floor(ongoingGameInfo.score / ongoingGameInfo.maxScore * 100) > 50) {
      playPositifEndgameSound({ id: randElement(positifEndgameKeys) })
    } else {
      playNegatifEndgameSound({ id: randElement(negatifEndgameKeys) })
    }
    setShowScore(true)
    setReset(false)
  }

  return (
    <>
      {
        data.length > 0 ?
          <>
            <GameHeader update={headerData.update} target={headerData.target} />

            <Stack>
              <DndProvider backend={HTML5Backend}>
                {data[ongoingGameInfo.currentStep - 1].stepTable.map(
                  (verb, i) => {
                    if (data[ongoingGameInfo.currentStep - 1].visiblePronouns[i] !== '') {

                      const secondPart = verb.name.split(" ")[1]
                      return <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        sx={{ m: 2, flexWrap: 'wrap', maxWidth: 'md' }}
                        alignItems='center'
                        justifyContent='space-between'
                        key={i}
                      >
                        <Typography>
                          {data[ongoingGameInfo.currentStep - 1].visiblePronouns[i]}
                        </Typography>
                        <DropArea
                          item={verb}
                          truth={data[ongoingGameInfo.currentStep - 1].correction[i]}
                          itemType='verb'
                          moveItem={moveItem}
                          showResult={showResult}
                          id={i}
                        />
                        {secondPart &&
                          <Typography>
                            {secondPart}
                          </Typography>}
                      </Stack>
                    } else return ""
                  })}

              </DndProvider>
            </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' sx={{ width: 100 }} color='secondary' onClick={handleClick}>Vérifier</Button>
            </Box>
            {!showScore && <ProgressBar nextStep={nextStep} />}
            <Score open={showScore} handleClose={handleClose} />
          </> :
          <Typography> No Data </Typography>

      }
    </>
  )
}

export default MoveMe
