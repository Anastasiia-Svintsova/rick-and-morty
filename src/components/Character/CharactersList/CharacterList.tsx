import React, { FC } from 'react';

import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';

import {
  MEDIA_QUERY_MOBILE,
  MEDIA_QUERY_TABLET,
  MEDIA_QUERY_LARGE_DESKTOP,
} from '../../../common/constants';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../store/hooks/reduxHooks';
import { updateLikedCharacters } from '../../../store/reducers/ActionCreator';
import { Character } from '../../../types/Character';
import { CharacterCard } from '../CharacterCard';

interface CharacterListProps {
  characters: Character[];
}

export const CharacterList: FC<CharacterListProps> = ({ characters }) => {
  const { user, userLikedCharacters } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(MEDIA_QUERY_MOBILE);
  const isTablet = useMediaQuery(MEDIA_QUERY_TABLET);
  const isLargeScreen = useMediaQuery(MEDIA_QUERY_LARGE_DESKTOP);

  const getCharacterStatus = (id: number) => {
    return userLikedCharacters.some((item: Character) => item.id === id);
  };

  const onLikePress = (character: Character, isLiked: boolean) => {
    if (!user) return;

    const updatedLikedCharacters = isLiked
      ? userLikedCharacters.filter(
          (item: Character) => item.id !== character.id
        )
      : [...userLikedCharacters, character];

    dispatch(updateLikedCharacters(updatedLikedCharacters, user.uid));
  };

  return (
    <ImageList
      cols={(isMobile && 1) || (isLargeScreen && 4) || (isTablet && 2) || 3}
      gap={20}
      sx={{ p: 1, m: 0 }}
    >
      {characters.map((character) => (
        <ImageListItem key={character.id}>
          <CharacterCard
            user={user}
            character={character}
            isLiked={getCharacterStatus(character.id)}
            onLikePress={onLikePress}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default CharacterList;
