import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { Divider, Stack, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, Box, IconButton, useMediaQuery, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import InputChip from './../../Components/InputChip/InputChip';
import ListChip from './../../Components/ListChip/ListChip';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentCustomTenseGroupsState, currentCustomVerbGroupsState, currentGameState, currentPresetTenseGroupsState, currentPresetVerbGroupsState, currentTensesState, currentVerbsState, ongoingGameState, tensesState, verbsState } from '../../Data/State';
import { speeds, specialTenses } from '../../Data/defaults';
import dommage from '../../Assets/audio/adam_dommage.mp3';
import useSound from 'use-sound';
import { Add, PhotoCamera } from '@mui/icons-material';

const Pregame = () => {
  const [currentCustomVerbGroups, setCurrentCustomVerbGroups] = useRecoilState(currentCustomVerbGroupsState)
  const presetVerbGroups = useRecoilValue(currentPresetVerbGroupsState)
  const presetTenseGroups = useRecoilValue(currentPresetTenseGroupsState)
  const [currentCustomTenseGroups, setCurrentCustomTenseGroups] = useRecoilState(currentCustomTenseGroupsState)
  const [currentVerbs, setCurrentVerbs] = useRecoilState(currentVerbsState)
  const [currentTenses, setCurrentTenses] = useRecoilState(currentTensesState)
  const currentGame = useRecoilValue(currentGameState)
  const [ongoingGameInfo, setOngoingGameInfo] = useRecoilState(ongoingGameState)
  const [addTenseMode, setAddTenseMode] = useState(false)
  const [addVerbMode, setAddVerbMode] = useState(false)
  useEffect(() => {
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

  const handleDeleteVerbGroup = (data: string) => {
    setCurrentCustomVerbGroups(oldGroups => oldGroups.filter(group => group.title !== data))
  }

  const handleDeleteTenseGroup = (data: string) => {
    setCurrentCustomTenseGroups(oldGroups => oldGroups.filter(group => group.title !== data))
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

  const isXs = useMediaQuery("(max-width:600px)");
  const handleAddGroup = (groupType: string) => {
    if (groupType === 'verb') {
    } else {
      setAddTenseMode(prev => !prev)
      if (!addTenseMode) {
      }

    }
  }
  const over = { justifyContent: 'center', display: "flex", mb: 0, ml: 0 }
  const up = { justifyContent: 'center', display: "flex", mb: 3, ml: 3 }
  return (
    <>
      <Typography sx={{ m: 0, mb: 2, ml: 3, fontWeight: 'bold' }} variant="h4">{currentGame.title}</Typography>
      <Stack spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='center'
        divider={<Divider orientation="vertical" sx={{ width: '5px' }} flexItem />}
      >
        <Container>
          <InputChip selectList={verbs} changeFunc={handleChangeVerb} placeholder='Choisir les verbes' deleteFunc={handleDeleteVerb} currentList={currentVerbs} />
          <Typography variant="body1">Sélectionne un groupe custom</Typography>
          <ListChip withDelete chipData={currentCustomVerbGroups} deleteGroup={handleDeleteVerbGroup} selectFunc={handleSelectVerb} />
          <Typography variant="body1">Sélectionne un groupe prédéfini</Typography>
          <ListChip chipData={presetVerbGroups} selectFunc={handleSelectVerb} />
        </Container>
        <Container>
          <InputChip isTense selectList={getTenses()} changeFunc={handleChangeTense} placeholder='Choisir le temps' deleteFunc={handleDeleteTense} currentList={currentTenses} />
          <Typography variant="body1">Sélectionne un groupe custom</Typography>
          <Stack
            direction={{ sx: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            {!addTenseMode ?
              <Box sx={{ display: "flex", flexGrow: 8, width: "100%" }}>
                <ListChip withDelete deleteGroup={handleDeleteTenseGroup} isTense chipData={currentCustomTenseGroups} selectFunc={handleSelectTense} />
              </Box> :

              <TextField id="filled-basic" label="Filled" variant="filled" />
            }

            <Box width={{ xs: "100%", md: "120px" }}
              height="40px"
              sx={{ justifyContent: 'center', display: "flex", mb: 3, ml: { md: 3, xs: 0 } }}
            >
              <Button variant="contained"
                sx={{ width: "100%", height: "100%" }}
                color="warning"
                onClick={() => handleAddGroup("tense")}
                startIcon={<Add />}
              >
                Ajouter
              </Button>
            </Box>
          </Stack>
          <Typography variant="body1">Sélectionne un groupe prédéfini</Typography>
          <ListChip isTense chipData={presetTenseGroups} selectFunc={handleSelectTense} />
        </Container>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 12, md: 28 }} justifyContent="space-between" alignItems="center" sx={{ margin: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ width: "100%", maxWidth: 'sm' }} spacing={1}>
          {
            currentGame.url !== "complete" &&
            <FormControl disabled={currentGame.url === 'complete'} variant="filled" sx={{ m: 0, mr: 1, minWidth: 120, width: '100%' }}>
              <InputLabel id="step-max-label">Nombre de rondes</InputLabel>
              <Select
                sx={{ background: 'white', height: 50 }}
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
          <FormControl sx={{ minWidth: 120, width: '100%' }} variant="filled">
            <InputLabel id="step-max-label">Vitesse</InputLabel>
            <Select
              sx={{ background: 'white', height: 50 }}
              labelId="speed-label"
              id="speed-helper"
              value={ongoingGameInfo.maxTime.toString()}
              onChange={handleSpeedChange}
            >
              {speeds.map((ele, i) => <MenuItem key={i} value={ele.value}>{ele.name}</MenuItem>)}

            </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>
        </Stack>
        <Button disabled={canAdvance()} sx={{ minWidth: 150 }} size='large' component={Link} to={"/games/" + currentGame.url} variant="contained" color="warning">
          Travaller
        </Button>
      </Stack>
    </>
  )
}

export default Pregame