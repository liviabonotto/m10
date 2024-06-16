import React from 'react'
import styles from './alert-modal-styles.module.scss'
import Backdrop from '@mui/material/Backdrop'
import { Modal, Typography, Box, Divider } from '@mui/material'
import Button from '../button/button'

type Props = {
  title: string
  description: string
  onClose: () => void
  opened: boolean
  confirm?: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0',
  borderRadius: '4px',
  boxShadow: 24,
  padding: '24px 32px'
}

const AlertModal: React.FC<Props> = ({ title, description, onClose, opened, confirm }: Props) => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClose = () => {
    onClose()
  }

  return (
    <div cy-testid="pkg-alert-modal" className={styles.modal}>
      <Modal
        open={opened}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Box className={styles.box} sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            {title || 'Modal Title'}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {description || 'Modal Description'}
          </Typography>
          <div className={styles.lineContainer}>
            <Divider className={styles.line} />
          </div>
          {
            confirm
              ? <div className={styles.button}>
                <Button text={'CANCELAR'} type={'cancel'} size={'small'} action={() => { handleClose() }}></Button>
                <Button text={'CONFIRMAR'} type={'secondary'} size={'small'} action={() => { confirm?.() }}></Button>
              </div>
              : <div className={styles.button}>
                <Button text={'FECHAR'} type={'secondary'} size={'small'} action={() => { handleClose() }}></Button>
              </div>
          }
        </Box>
      </Modal>
    </div>
  )
}

export default AlertModal
