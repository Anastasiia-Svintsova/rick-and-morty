import React, { FC } from 'react';

import { Grid, Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { Character } from '../../../types/Character';
import { useStyles } from '../../UIContext';

interface CharacterDetailProps {
  character: Character;
}

export const CharacterDetail: FC<CharacterDetailProps> = ({ character }) => {
  const classes = useStyles();
  const { name, type, status, species, origin, location, image, episode } =
    character;

  const detailsMap = [
    { title: 'Name', body: name },
    { title: 'Type', body: type },
    { title: 'Status', body: status },
    { title: 'Species', body: species },
    { title: 'Origin', body: origin.name },
    { title: 'Location', body: location.name },
    { title: 'Episodes amount', body: episode.length },
  ];

  return (
    <Grid container justifyContent='center' alignItems='center' spacing={8}>
      <Grid item lg={5}>
        <Box
          component='img'
          alt={name}
          src={image}
          className={[classes.circle, classes.fullWidth].join(' ')}
        />
      </Grid>
      <Grid item alignItems='center'>
        <Stack spacing={2} alignItems='center'>
          {detailsMap.map((detail) => (
            <Stack key={detail.title} direction='row'>
              <Typography
                color='primary'
                variant='subtitle1'
              >{`${detail.title}:`}</Typography>
              &nbsp;
              <Typography variant='subtitle1'>
                {detail.body || 'unknown'}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CharacterDetail;
