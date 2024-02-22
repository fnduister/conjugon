import {
  MouseSensor,
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  DragEndEvent,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
  closestCorners
} from '@dnd-kit/core'
import { DropItem } from './DropItem';
import { MoveMeGameInfo, VerbProps } from './../../../Data/interfaces';
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { config, useSpring } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import GameHeader from '../../../Components/GameHeader/GameHeader'
import ProgressBar from '../../../Components/ProgressBar/ProgressBar'
import {
  negatifEndgameSpriteMap,
  negatifEndgameKeys,
  positifEndgameSpriteMap,
  positifEndgameKeys
} from '../../../Data/defaults'
import { UpdateHeader, Verb } from '../../../Data/interfaces'
import { conjugationTables, currentTensesState, currentVerbsState, ongoingGameState, timerState } from '../../../Data/State'
import { findPronoun, randElement, shuffle } from '../../../utils'
import Score from '../Score/Score'
// import { Input } from './styled'
import useSound from 'use-sound';
import negatifEndgame from '../../../Assets/interactif/negatifEndgame_mixdown.mp3'
import positifEndgame from '../../../Assets/interactif/positifEndgame_mixdown.mp3'

import {
  arrayMove,

  rectSortingStrategy,

  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import Dragable from './Dragable';


interface Item {
  id: number;
  value: string;
}

interface RealItem {
  some: string;
  realValue: Item[]
}


const MoveMe = () => {
  const [data, setData] = useState<MoveMeGameInfo[]>([])
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
  const [paused, setPaused] = useState(false)
  const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor); // Initialize touch sensor

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log('🚀 ~ handleDragEnd ~ active', active);
    console.log('🚀 ~ handleDragEnd ~ over', over);
    if (over && !showResult) {
      if (active.id !== over.id) {
        setData(old => {
          return old.map((info, i) => {
            if (i === ongoingGameInfo.currentStep - 1) {
              const refTable = info.stepTable.map(e => e.pos.toString())
              const old: string = active.id as string
              const newi: string = over.id as string
              const oldIndex = refTable.indexOf(old);
              const newIndex = refTable.indexOf(newi);
              const newTable = arrayMove(info.stepTable, oldIndex, newIndex);
              // const pronouns = arrayMove(info.visiblePronouns, oldIndex, newIndex);

              console.log('🚀 ~ returnold.map ~ newTable', newTable);
              return { ...info, stepTable: newTable }
            } else return info
          })
        })
      }
    }
  }

  useEffect(() => {
    resetGame()
  }, [])

  const handleClick = (e: any) => {
    nextStep()
  };

  const resetGame = () => {
    setProgress(0)
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
            console.log('🚀 ~ shuffle ~ finishingTable', finishingTable);

            const stepInfo = {
              stepVerb,
              stepTable: shuffle(finishingTable),
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
    console.log("calling next step")
    updateHeader('step')
    getCorrection()
    setPaused(true)
    setShowResult(true)
    updateHeader('score')

    setTimeout(() => {
      setShowResult(false)

      if (ongoingGameInfo.currentStep >= ongoingGameInfo.maxStep) {
        setTimeout(() => { showScoreOverlay() }, 1500);
      } else {
        setTimeout(() => {
          setOngoingGameInfo(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))
        }, 200)
      }
      setPaused(false)
      setProgress(0)
    }, 2000);
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

  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <>
      {
        data.length > 0 ?
          <>
            <GameHeader update={headerData.update} target={headerData.target} />
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext
                items={data[ongoingGameInfo.currentStep - 1].stepTable.map((ele) => ele.pos.toString())}
                strategy={verticalListSortingStrategy}
              >
                {
                  data[ongoingGameInfo.currentStep - 1].stepTable.map(
                    (ele, i) => <SortableItem
                      pronoun={data[ongoingGameInfo.currentStep - 1].visiblePronouns[i]}
                      item={ele}
                      showResult={showResult}
                      correction={data[ongoingGameInfo.currentStep - 1].correction[i]}
                      key={ele.pos}
                    />
                  )
                }
              </SortableContext>

            </DndContext>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' sx={{ width: 100 }} color='secondary' onClick={handleClick}>Vérifier</Button>
            </Box>
            {(!showScore && ongoingGameInfo.maxTime !== 0) && <ProgressBar paused={paused} nextStep={nextStep} />}
            <Score open={showScore} handleClose={handleClose} />
          </> :
          <Typography> No Data </Typography>

      }
    </>
  )
}

export default MoveMe
