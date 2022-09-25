import React, { FC, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField, Grid, useMediaQuery } from '@mui/material';

import { MEDIA_QUERY_MOBILE } from '../../common/constants';
import { MainButton } from '../Buttons/MainButton';
import { useStyles } from '../UIContext';

interface AutocompleteProps {
  options: string[];
  value: string;
  setValue: (value: string) => void;
}

export const Search: FC<AutocompleteProps> = ({ options, value, setValue }) => {
  const [searchParam, setSearchParam] = useState(value);
  const isMobile = useMediaQuery(MEDIA_QUERY_MOBILE);
  const classes = useStyles();

  const handleInputChange = (param: string, reason: string) => {
    setSearchParam(param);

    if (reason === 'reset' || reason === 'clear') {
      setValue(param);
    }
  };

  const handleSearch = () => {
    setValue(searchParam);
  };

  return (
    <Grid container spacing={2} alignItems='center' justifyContent='center'>
      <Grid item lg={6} xs={10} sm={8}>
        <Autocomplete
          disablePortal
          autoHighlight
          options={options}
          value={value}
          freeSolo
          className={classes.root}
          onInputChange={(event, value, reason) =>
            handleInputChange(value, reason)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search by name'
              className={classes.root}
            />
          )}
        />
      </Grid>

      <Grid item>
        {isMobile ? (
          <SearchIcon fontSize='large' color='primary' onClick={handleSearch} />
        ) : (
          <MainButton
            text='Search'
            onClick={handleSearch}
            disabled={!searchParam}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Search;
