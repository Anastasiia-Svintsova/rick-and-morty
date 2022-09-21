import React, { FC, ReactNode } from 'react';

import { Box, useMediaQuery } from '@mui/material';

import { MEDIA_QUERY_MOBILE, MEDIA_QUERY_TABLET } from '../../common/constants';

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper: FC<WrapperProps> = ({ children }) => {
  const isMobile = useMediaQuery(MEDIA_QUERY_MOBILE);
  const isTablet = useMediaQuery(MEDIA_QUERY_TABLET);

  return (
    <Box
      px={(isMobile && 3) || (isTablet && 5) || 10}
      pt={((isMobile || isTablet) && 15) || 20}
      pb={(isMobile && 3) || 8}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
