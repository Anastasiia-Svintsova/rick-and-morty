import { FC } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Button } from '@mui/material'

interface CloseButtonProps {
  onClick: () => void
}

const style = {
  position: 'absolute',
  top: 10,
  right: 10,
  p: 0,
  m: 0,
  minWidth: 0,
}

export const CloseButton: FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} sx={style}>
      <CloseIcon />
    </Button>
  )
}

export default CloseButton
