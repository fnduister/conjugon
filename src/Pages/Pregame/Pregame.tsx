import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { Divider, Stack, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, Box } from '@mui/material';
import Container from '@mui/material/Container';
import InputChip from './../../Components/InputChip/InputChip';
import ListChip from './../../Components/ListChip/ListChip';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentCustomTenseGroupsState, currentCustomVerbGroupsState, currentGameState, currentPresetTenseGroupsState, currentPresetVerbGroupsState, currentTensesState, currentVerbsState, ongoingGameState, tensesState, verbsState } from '../../Data/State';
import { speeds, specialTenses } from '../../Data/defaults';

const Pregame = () => {
  const customVerbGroups = useRecoilValue(currentCustomVerbGroupsState)
  const presetVerbGroups = useRecoilValue(currentPresetVerbGroupsState)
  const presetTenseGroups = useRecoilValue(currentPresetTenseGroupsState)
  const currentCustomTenseGroups = useRecoilValue(currentCustomTenseGroupsState)
  const [currentVerbs, setCurrentVerbs] = useRecoilState(currentVerbsState)
  const [currentTenses, setCurrentTenses] = useRecoilState(currentTensesState)
  const currentGame = useRecoilValue(currentGameState)
  const [ongoingGameInfo, setOngoingGameInfo] = useRecoilState(ongoingGameState)

  useEffect(() => {
    // setCurrentVerbs([])
    // setCurrentTenses([])
    if (![5, 10, 15].includes(ongoingGameInfo.maxStep)) {
      setOngoingGameInfo(prev => ({ ...prev, maxStep: 5 }))
    }
  }, [])

  const verbs = useRecoilValue(verbsState)
  const tenses = useRecoilValue(tensesState)

  const handleDeleteTense = (data: string) => {
    setCurrentTenses(tenses => tenses.filter(tense => tense !== data))
  }

  const handleDeleteVerb = (data: string) => {
    setCurrentVerbs(verbs => verbs.filter(verb => verb !== data))
  }

  const handleChangeTense = (data: string[]) => {
    setCurrentTenses(data)
  }

  const handleChangeVerb = (data: string[]) => {
    setCurrentVerbs(data)
  }

  const handleSelectVerb = (data: string[], selected: boolean) => {
    if (!selected) {
      setCurrentVerbs(old => {
        const weKeep = data.filter(x => !old.includes(x))
        return [...old, ...weKeep]
      })
    } else {
      setCurrentVerbs(old => old.filter(value => !data.includes(value)))
    }
  }

  const handleSelectTense = (data: string[], selected: boolean) => {
    if (!selected) {
      setCurrentTenses(old => [...old, ...data])
    } else {
      setCurrentTenses(old => old.filter(value => !data.includes(value)))
    }
  }

  const canAdvance = () => {
    // setOngoingGameInfo(prev => ({...prev, isOn: true}))
    return currentVerbs.length === 0 || currentTenses.length === 0
  }

  const handleStepsChange = (event: SelectChangeEvent) => {
    setOngoingGameInfo(prev => ({ ...prev, maxStep: +event.target.value }))
  };

  const handleSpeedChange = (event: SelectChangeEvent) => {
    setOngoingGameInfo(prev => ({ ...prev, maxTime: +event.target.value }))
  };

  const getTenses = (): string[] => {
    return (currentGame.url !== "race") ? tenses.filter(tense => !specialTenses.includes(tense)) : tenses
  }

  return (
    <>
      <Typography sx={{ m: 0, mb: 2, ml: 3, fontWeight: 'bold' }} variant="h4">{currentGame.title}</Typography>
      <Stack direction="row" spacing={2}
        sx={{ display: 'flex', justifyContent: 'center' }}
        divider={<Divider orientation="vertical" sx={{ width: '5px' }} flexItem />}
      >
        <Container>
          <Typography variant="body1">Choisir les verbes</Typography>
          <InputChip selectList={verbs} changeFunc={handleChangeVerb} placeholder='Verbes' deleteFunc={handleDeleteVerb} currentList={currentVerbs} />
          <Typography variant="body1">Sélectionne un groupe custom</Typography>
          <ListChip chipData={customVerbGroups} selectFunc={handleSelectVerb} />
          <Typography variant="body1">Sélectionne un groupe prédéfini</Typography>
          <ListChip chipData={presetVerbGroups} selectFunc={handleSelectVerb} />
        </Container>
        <Container>
          <Typography variant="body1">Choisir les temps</Typography>
          <InputChip isTense selectList={getTenses()} changeFunc={handleChangeTense} placeholder='Le temps' deleteFunc={handleDeleteTense} currentList={currentTenses} />
          <Typography variant="body1">Sélectionne un groupe custom</Typography>
          <ListChip chipData={currentCustomTenseGroups} selectFunc={handleSelectTense} />
          <Typography variant="body1">Sélectionne un groupe prédéfini</Typography>
          <ListChip chipData={presetTenseGroups} selectFunc={handleSelectTense} />
        </Container>
      </Stack>
      <Container sx={{ mt: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }} maxWidth="xl">
        <Box>
          {
            currentGame.url !== "complete" &&
            <FormControl disabled={currentGame.url === 'complete'} sx={{ m: 0, mr: 1, minWidth: 120 }}>
              <InputLabel id="step-max-label">Nombre de rondes</InputLabel>
              <Select
                sx={{ background: 'white', height: 40 }}
                labelId="step-max-label"
                id="step-max-helper"
                value={ongoingGameInfo.maxStep.toString()}
                label="Age"
                onChange={handleStepsChange}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
              {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
          }
          <FormControl sx={{ m: 0, minWidth: 120 }}>
            <InputLabel id="step-max-label">Vitesse</InputLabel>
            <Select
              sx={{ background: 'white', height: 40 }}
              labelId="speed-label"
              id="speed-helper"
              value={ongoingGameInfo.maxTime.toString()}
              label="Age"
              onChange={handleSpeedChange}
            >
              {speeds.map((ele, i) => <MenuItem key={i} value={ele.value}>{ele.name}</MenuItem>)}

            </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>
        </Box>
        <Button disabled={canAdvance()} sx={{ height: '40px' }} component={Link} to={"/games/" + currentGame.url} variant="contained" color="warning">
          Travaller
        </Button>
      </Container>
    </>
  )
}

export default Pregame