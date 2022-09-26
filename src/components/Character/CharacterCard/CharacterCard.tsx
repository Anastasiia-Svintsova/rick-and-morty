import React, { FC, useState, useEffect, useCallback } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useTheme,
  CardActions,
  IconButton,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Character, CharacterStatus } from '../../../types/Character';
import { User } from '../../../types/User';
import { useStyles } from '../../UIContext';

interface CharacterCardProps {
  user: null | User;
  character: Character;
  isLiked: boolean;
  onLikePress: (character: Character, isLiked: boolean) => void;
}

export const CharacterCard: FC<CharacterCardProps> = ({
  character,
  user,
  isLiked,
  onLikePress,
}) => {
  const [statusColor, setStatusColor] = useState('info');
  const { palette } = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();

  const { image, name, status, species, gender, id } = character;
  const { primary, error, info } = palette;

  const getStatusColor = useCallback(() => {
    switch (status) {
      case CharacterStatus.ALIVE:
        setStatusColor(primary.main);
        break;

      case CharacterStatus.DEAD:
        setStatusColor(error.main);
        break;

      case CharacterStatus.UNKNOWN:
        setStatusColor(info.main);
        break;

      default:
        setStatusColor(info.main);
        break;
    }
  }, [error.main, info.main, primary.main, status]);

  const handleLikePress = () => {
    onLikePress(character, isLiked);
  };

  const handleCharacterDetailOpen = () => {
    if (!user) return;

    navigate(`/character/${id}`);
  };

  useEffect(() => {
    getStatusColor();
  }, [getStatusColor]);

  return (
    <Card
      className={[classes.flexGrow, classes.flexColumn, classes.cardHover].join(
        ' '
      )}
    >
      <Box onClick={handleCharacterDetailOpen}>
        <CardMedia
          component='img'
          height='300'
          image={image}
          alt={name}
          loading='lazy'
        />
        <Box bgcolor={statusColor}>
          <Typography color='white' variant='subtitle1'>
            {status}
          </Typography>
        </Box>
        <CardContent>
          <Typography variant='subtitle1'>{`Name: ${name}`}</Typography>
          <Typography variant='subtitle1'>{`${species} - ${gender}`}</Typography>
        </CardContent>
      </Box>
      {user && (
        <CardActions
          className={classes.flexGrow}
          sx={{ alignItems: 'flex-end' }}
        >
          <Box className={[classes.space, classes.flexGrow].join(' ')}>
            <IconButton aria-label='add to favorites' onClick={handleLikePress}>
              <FavoriteIcon
                fontSize='large'
                color={isLiked ? 'warning' : 'action'}
              />
            </IconButton>

            <Button color='info' onClick={handleCharacterDetailOpen}>
              More Info
            </Button>
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

export default CharacterCard;
