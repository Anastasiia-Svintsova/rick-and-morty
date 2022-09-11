import React, { FC } from 'react'

import { ImageList, ImageListItem, useMediaQuery } from '@mui/material'

import {
  MEDIA_QUERY_MOBILE,
  MEDIA_QUERY_TABLET,
  MEDIA_QUERY_LARGE_DESKTOP,
} from '../../../common/constants'
import { Character } from '../../../types/Character'
import { CharacterCard } from '../CharacterCard'

interface CharacterListProps {
  characters: Character[]
}

export const CharacterList: FC<CharacterListProps> = ({ characters }) => {
  const isMobile = useMediaQuery(MEDIA_QUERY_MOBILE)
  const isTablet = useMediaQuery(MEDIA_QUERY_TABLET)
  const isLargeScreen = useMediaQuery(MEDIA_QUERY_LARGE_DESKTOP)

  return (
    <ImageList
      cols={(isMobile && 1) || (isLargeScreen && 4) || (isTablet && 2) || 3}
      gap={20}
    >
      {characters.map((character) => (
        <ImageListItem key={character.id}>
          <CharacterCard character={character} />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default CharacterList
