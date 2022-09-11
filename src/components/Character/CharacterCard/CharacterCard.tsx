import React, { FC, useState, useEffect, useCallback } from 'react'

import FavoriteIcon from '@mui/icons-material/Favorite'
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
} from '@mui/material'

import { Character, CharacterStatus } from '../../../types/Character'
import { useStyles } from '../../UIContext'

interface CharacterCardProps {
  character: Character
}

export const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  const [statusColor, setStatusColor] = useState('info')
  const { palette } = useTheme()
  const classes = useStyles()

  const { image, name, status, species, gender } = character
  const { primary, error, info } = palette

  const getStatusColor = useCallback(() => {
    switch (status) {
      case CharacterStatus.ALIVE:
        setStatusColor(primary.main)
        break

      case CharacterStatus.DEAD:
        setStatusColor(error.main)
        break

      case CharacterStatus.UNKNOWN:
        setStatusColor(info.main)
        break

      default:
        setStatusColor(info.main)
        break
    }
  }, [error.main, info.main, primary.main, status])

  useEffect(() => {
    getStatusColor()
  }, [getStatusColor])

  return (
    <Card className={[classes.flexGrow, classes.flexColumn].join(' ')}>
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
      <CardActions className={classes.flexGrow} sx={{ alignItems: 'flex-end' }}>
        <Box className={[classes.space, classes.flexGrow].join(' ')}>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon fontSize='large' />
          </IconButton>

          <Button color='info'>More Info</Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default CharacterCard
