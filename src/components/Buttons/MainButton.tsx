import React, { FC } from 'react'

import { Button, Typography, ButtonProps } from '@mui/material'

interface MainButtonProps extends ButtonProps {
  text: string
}

export const MainButton: FC<MainButtonProps> = ({
  text,
  fullWidth = false,
  disabled = false,
  onClick,
  variant = 'contained',
  color = 'primary',
  type = 'button',
}) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      color={color}
    >
      <Typography variant='button' fontSize={18}>
        {text}
      </Typography>
    </Button>
  )
}

export default MainButton
