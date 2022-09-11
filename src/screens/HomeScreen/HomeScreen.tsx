import React from 'react'

import { CharacterList } from '../../components/Character/CharactersList'
import { Header } from '../../components/Header'
import { Wrapper } from '../../components/Wrapper'
import { useAppSelector } from '../../store/hooks/reduxHooks'

export const HomeScreen = () => {
  const { characters } = useAppSelector((state) => state.characterReducer)
  return (
    <Wrapper>
      <Header />
      {characters && <CharacterList characters={characters} />}
    </Wrapper>
  )
}

export default HomeScreen
