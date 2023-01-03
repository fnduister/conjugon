import { Box, Button, Container, Typography } from '@mui/material'
import { animated, config, useSpring } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import GameHeader from '../../../Components/GameHeader/GameHeader'
import ProgressBar from '../../../Components/ProgressBar/ProgressBar'
import { VerbToText } from '../../../Data/defaults'
import { FindErrorGameInfo, RaceGameInfo, UpdateHeader, Verb } from '../../../Data/interfaces'
import { currentVerbsState, conjugationTables, tensesState, currentTensesState, ongoingGameState, timerState } from '../../../Data/State'
import { findPronoun, shuffle } from '../../../utils'
import Score from '../Score/Score'

const FindError = () => {
    const [data, setData] = useState<FindErrorGameInfo[]>([])
    const currentVerbs = useRecoilValue(currentVerbsState)
    const tables = useRecoilValue(conjugationTables)
    const tenses = useRecoilValue(tensesState)
    const currentTenses = useRecoilValue(currentTensesState)
    const [ongoingGameInfo, setOngoingGameInfo] = useRecoilState(ongoingGameState)
    const [progress, setProgress] = useRecoilState(timerState)
    const [showScore, setShowScore] = useState(false)
    const [reset, setReset] = useState(true)
    const AnimatedBox = animated(Box)
    const [headerData, updateHeaderData] = useState<UpdateHeader>({ update: false, target: 'step' })

    useEffect(() => {
        resetGame()
    }, [])

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

    const resetGame = () => {
        setOngoingGameInfo(prev => ({
            ...prev, currentStep: 1, score: 0
        }))

        const verbTables = tables.filter(table => currentVerbs.includes(table.infinitif))
        let currentData = []
        let maxScore = 0
        for (var i = 0; i < ongoingGameInfo.maxStep; i++) {
            const stepTense: string = currentTenses[Math.floor(Math.random() * currentTenses.length)]
            console.log("🚀 ~ file: FindError.tsx:50 ~ resetGame ~ stepTense", stepTense)

            // get the possible tenses, we want at least 2 of the tense selected and the reset is random
            let visibleWords: string[] = []
            const leftTenses = currentTenses.filter(tense => tense !== stepTense)
            const errorTense: string = leftTenses[Math.floor(Math.random() * leftTenses.length)]
            console.log("🚀 ~ file: FindError.tsx:56 ~ resetGame ~ errorTense", errorTense)
            const errorVerb: string = currentVerbs[Math.floor(Math.random() * currentVerbs.length)]
            const errorTable: Verb = tables.filter(table => table.infinitif === errorVerb)[0]
            console.log("🚀 ~ file: FindError.tsx:59 ~ resetGame ~ errorTable", errorTable)
            const errorConjuge = errorTable[errorTense as keyof Verb]
            console.log("🚀 ~ file: FindError.tsx:61 ~ resetGame ~ errorConjuge", errorConjuge)
            let error = ""
            let pronounPos = 0
            if (errorConjuge !== undefined) {
                do {
                    pronounPos = Math.floor(Math.random() * 6)
                    error = errorConjuge[pronounPos]
                    error = findPronoun(error, pronounPos) + error
                } while (error === "")
                visibleWords.push(error)
                console.log("🚀 ~ file: FindError.tsx:62 ~ resetGame ~ error", error)
            } else {
                console.log("doesn't work with this tense")
            }

            // find conjuged verb with this tense
            for (var v = 0; v < 3; v++) {
                const vb: string = currentVerbs[Math.floor(Math.random() * currentVerbs.length)]
                console.log("🚀 ~ file: FindError.tsx:61 ~ resetGame ~ vb", vb)
                // take a random verb from the selected list of verbs
                const vt: Verb = tables.filter(table => table.infinitif === vb)[0]
                console.log("🚀 ~ file: FindError.tsx:63 ~ resetGame ~ vt", vt)
                const newT = vt[stepTense as keyof Verb]
                if (newT !== undefined) {
                    let newW = ""
                    do {
                        pronounPos = Math.floor(Math.random() * 6)
                        newW = newT[pronounPos]
                        newW = findPronoun(newW, pronounPos) + newW
                    } while (newW === "" || visibleWords.includes(newW))
                    visibleWords.push(newW)
                } else {
                    console.log("no word were found for that tense")
                }
            }
            console.log("🚀 ~ file: FindError.tsx:72 ~ resetGame ~ visibleWords", visibleWords)
            const stepInfo = {
                error,
                visibleWords: shuffle(visibleWords),
                stepTense
            }
            // some code
            maxScore = maxScore + 1

            currentData.push(stepInfo)
        }
        setOngoingGameInfo(prev => ({...prev, maxScore: maxScore*100}))

        setData(currentData)
    }

    const updateHeader = (target: string) => {
        updateHeaderData(prev => ({ update: !prev.update, target }))
    }

    const nextStep = (guess?: string) => {
        updateHeader('step')
        if (guess && guess === data[ongoingGameInfo.currentStep - 1].error) {
            updateHeader('score')
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
            setOngoingGameInfo(prev => ({ ...prev, isOn: false }))
            setShowScore(true)
            setReset(false)
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
                    <Container sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                        <AnimatedBox style={props}>
                            <Typography variant='body1' >{data[ongoingGameInfo.currentStep - 1] && VerbToText[data[ongoingGameInfo.currentStep - 1].stepTense as keyof typeof VerbToText]}</Typography>
                        </AnimatedBox>
                    </Container>
                    <Container sx={{ width: 500, flexWrap: 'wrap', display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                        <Button onClick={() => nextStep(data[ongoingGameInfo.currentStep - 1].visibleWords[0])} color="secondary" sx={{ m: 1, width: 200, height: 100 }} variant='contained'>
                            {data[ongoingGameInfo.currentStep - 1].visibleWords[0]}
                        </Button>
                        <Button onClick={() => nextStep(data[ongoingGameInfo.currentStep - 1].visibleWords[1])} color="secondary" sx={{ m: 1, width: 200, height: 100 }} variant='contained'>
                            {data[ongoingGameInfo.currentStep - 1].visibleWords[1]}
                        </Button>
                        <Button onClick={() => nextStep(data[ongoingGameInfo.currentStep - 1].visibleWords[2])} color="secondary" sx={{ m: 1, width: 200, height: 100 }} variant='contained'>
                            {data[ongoingGameInfo.currentStep - 1].visibleWords[2]}
                        </Button>
                        <Button onClick={() => nextStep(data[ongoingGameInfo.currentStep - 1].visibleWords[3])} color="secondary" sx={{ m: 1, width: 200, height: 100 }} variant='contained'>
                            {data[ongoingGameInfo.currentStep - 1].visibleWords[3]}
                        </Button>
                    </Container>
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

export default FindError