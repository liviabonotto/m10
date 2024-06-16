import React from 'react'
import styles from './button.module.scss'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Close } from '@mui/icons-material'

type Props = {
  text: string
  type: 'logout' | 'kanban' | 'primary' | 'secondary' | 'cancel'
  icon?: 'filter' | 'add' | 'close' | 'right'
  size: 'small' | 'medium' | 'large'
  invert?: boolean
  disabled?: boolean
  action: () => void
}

const Button: React.FC<Props> = ({ text, type, icon, size, invert, disabled, action }: Props) => {
  return (
    <button cy-testid="btn" className={`${styles.button} ${styles[type]} ${styles[size]} ${invert && styles.right}`} disabled={disabled} onClick={() => { action() }}>
      {
        icon === 'filter' && (
          <FilterListIcon />
        )
      }

      {
        icon === 'add' && (
          <AddIcon />
        )
      }

      {
        icon === 'close' && (
          <Close />
        )
      }

      {
        icon === 'right' && (
          <KeyboardArrowRightIcon />
        )
      }

      <span>{text}</span>
    </button>
  )
}

export default Button
