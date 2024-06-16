import React from 'react'
import styles from './breadcrumb-styles.module.scss'

import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import HomeIcon from '@mui/icons-material/Home'
import StarIcon from '@mui/icons-material/Star'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'

type Props = {
  index: number
  title?: string
}

const Breadcrump: React.FC<Props> = ({ index, title }: Props) => {
  const navigate = useNavigate()

  return (
    <div className={styles.breadcrumb}>
      <Breadcrumbs aria-label="breadcrumb">
        {
          <Box
            className={styles.item}
            sx={{ display: 'flex', alignItems: 'center' }}
            color="rgba(0, 51, 88, 0.6)"
            onClick={() => { navigate('/') }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Início
          </Box>
        }

        {
          index === 2 && (
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color="rgba(0, 51, 88, 0.6)"
            >
              Projetos
            </Typography>
          )
        }

        {
          index > 2 && (
            <Box
              className={styles.item}
              sx={{ display: 'flex', alignItems: 'center' }}
              color="rgba(0, 51, 88, 0.6)"
              onClick={() => { navigate('/project') }}
            >
              <StarIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Projetos
            </Box>
          )
        }

        {
          index >= 3 && (
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color="rgba(0, 51, 88, 0.87)"
            >
              {title ?? 'Projeto'}
            </Typography>
          )
        }
      </Breadcrumbs>
    </div>
  )
}

export default Breadcrump
