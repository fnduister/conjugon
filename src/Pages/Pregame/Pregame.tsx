import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { Divider, Stack, Button } from '@mui/material';
import Container from '@mui/material/Container';
import InputChip from './../../Components/InputChip/InputChip';
import ListChip from './../../Components/ListChip/ListChip';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentCustomTenseGroupsState, currentCustomVerbGroupsState, currentGameState, currentPresetTenseGroupsState, currentPresetVerbGroupsState, currentTensesState, currentVerbsState, tensesState, verbsState } from '../../Data/State';

const Pregame = () => {
  const customVerbGroups = useRecoilValue(currentCustomVerbGroupsState)
  const presetVerbGroups = useRecoilValue(currentPresetVerbGroupsState)
  const presetTenseGroups = useRecoilValue(currentPresetTenseGroupsState)
  const currentCustomTenseGroups = useRecoilValue(currentCustomTenseGroupsState)
  const [currentVerbs, setCurrentVerbs] = useRecoilState(currentVerbsState)
  const [currentTenses, setCurrentTenses] = useRecoilState(currentTensesState)
  const currentGame = useRecoilValue(currentGameState)

  useEffect(() => {
    setCurrentVerbs([])
    setCurrentTenses([])
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
    return currentVerbs.length === 0 || currentTenses.length === 0
  }

  return (
    <>
      <Container sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: "flex-start", mb: 5 }} maxWidth="xl">
        <Typography color="warning" variant="h4">Jeu: {currentGame.title}</Typography>
      </Container>
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
          <InputChip selectList={tenses} changeFunc={handleChangeTense} placeholder='Tenses' deleteFunc={handleDeleteTense} currentList={currentTenses} />
          <Typography variant="body1">Sélectionne un groupe custom</Typography>
          <ListChip chipData={currentCustomTenseGroups} selectFunc={handleSelectTense} />
          <Typography variant="body1">Sélectionne un groupe prédéfini</Typography>
          <ListChip chipData={presetTenseGroups} selectFunc={handleSelectTense} />
        </Container>
      </Stack>
      <Container sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: "flex-end" }} maxWidth="xl">

        <Button disabled={canAdvance()} sx={{ height: '40px' }} component={Link} to={"/games/" + currentGame.url} variant="contained" color="warning">
          Travaller
        </Button>
      </Container>
    </>
  )
}

export default Pregame