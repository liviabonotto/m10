import React, { useState } from 'react'
import styles from './list-view-styles.module.scss'
import { Checkbox, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

type Props = {
  data: Item[]
  filter: string
  onChange: (items: string[]) => void
}

type Item = {
  text: string
  file: string
  date: string
}

const ListView: React.FC<Props> = ({ data, filter, onChange }: Props) => {
  const [checked, setChecked] = useState<string[]>([])

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
    onChange(newChecked)
  }

  const handleFilter = (): Item[] | null => {
    const filtred = data.filter((item) => item.text.includes(filter))

    if (filtred.length === 0) {
      return null
    }
    return filtred
  }

  return (
    <List cy-testid="list-modal"  dense sx={{ width: '100%' }} className={styles.list}>
      {
        handleFilter()?.map((item: Item, index) => {
          return <ListItem
            key={index}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(item.file)}
                checked={checked.includes(item.file)}
              />
            }
            disablePadding
          >
            <ListItemButton cy-testid="list-item" onClick={handleToggle(item.file)}>
              <ListItemText primary={item.text} secondary={`Última alteração: ${item.date}`} />
            </ListItemButton>
          </ListItem>
        }) ?? <p className={styles.notFound}>Nenhum arquivo foi encontrado</p>
      }
    </List>
  )
}

export default ListView
