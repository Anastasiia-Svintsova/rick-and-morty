import { FC } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, Box, Button, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';

import { MEDIA_QUERY_MOBILE } from '../../common/constants';
import { SignUpForm } from '../../components/forms/SignUpForm';
import { useStyles } from '../../components/UIContext';

export const SignUpScreen: FC = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery(MEDIA_QUERY_MOBILE);
  const navigate = useNavigate();

  const handleSuccess = () => navigate('/');

  return (
    <Grid container className={`${classes.signScreen} ${classes.fullHeight}`}>
      <Grid item md={5} xs={3} hidden={isMobile} position='relative'>
        <Box
          component='img'
          src={require('../../images/sign-screen.jpg')}
          alt='home image'
          className={classes.signScreenImage}
        />
      </Grid>

      <Grid
        item
        md={7}
        sm={9}
        xs={12}
        pt={6}
        pb={4}
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
      >
        <Box className={`${classes.flexColumn} ${classes.alignCenter}`} gap={5}>
          <Typography variant='h3'>Register</Typography>

          <Grid container justifyContent='center' flexGrow={1}>
            <Grid item lg={7} md={9} xs={10} flexGrow={1}>
              <SignUpForm onSuccess={handleSuccess} />
            </Grid>
          </Grid>

          <Box className={classes.flexColumn}>
            <Typography variant='h4'>Already have account?</Typography>

            <Button component={Link} to='/signIn'>
              Login
            </Button>
          </Box>

          <Button component={Link} to='/'>
            <ArrowBackIcon fontSize='small' />
            Go back home
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpScreen;
