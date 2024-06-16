import React from 'react'
import styles from './input-search-styles.module.scss'
import { IconButton, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'

type Props = {
  placeholder: string
  handleChange: (value: string) => void
}

const InputSearch: React.FC<Props> = ({ placeholder, handleChange }: Props) => {
  return (
    <div
      className={styles.search}
    >
      <IconButton className={styles.icon} type="button" aria-label="search">
        <Search />
      </IconButton>
      <InputBase
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        onChange={(e) => { handleChange(e.target.value) }}
      />
    </div>
  )
}

export default InputSearch
