import React, { FC } from 'react';
import './CosmosBackground.scss';

export const CosmosBackground: FC = () => {
  return (
    <>
      <div className='stars stars--small' />
      <div className='stars stars--medium' />
      <div className='stars stars--large' />
    </>
  );
};

export default CosmosBackground;
