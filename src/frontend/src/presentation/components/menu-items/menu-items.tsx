import React, { useState } from 'react'
import styles from './menu-items-styles.module.scss'

import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ExpandLess, ExpandMore, Star } from '@mui/icons-material'

export type MenuItem = {
  title: string
  url: string
  subItems?: MenuItem[]
  opened?: boolean
}

type Props = {
  data: MenuItem[]
}

const MenuItems: React.FC<Props> = ({ data }: Props) => {
  const [menuItems, setMenuItems] = useState(data)

  const handleClick = (index: number): void => {
    const newMenuItems = [...menuItems]
    newMenuItems[index].opened = !newMenuItems[index].opened

    setMenuItems(newMenuItems)
  }

  return (
    <List
      className={styles.menuItems}
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
    >
      {
        menuItems?.map((item: MenuItem, index: number) => {
          if (item.subItems) {
            return (
              <div key={`${item.title}-${index}`}>
                <ListItemButton onClick={() => { handleClick(index) }} >
                  <ListItemIcon>
                    <Star />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                  {item.opened ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton >
                <Collapse in={item.opened} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {
                      item.subItems.map((subItem: MenuItem, index: number) => {
                        return (
                          <ListItemButton key={`${subItem.title}-${index}`}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary={subItem.title} />
                          </ListItemButton>
                        )
                      })
                    }
                  </List>
                </Collapse>
              </div>
            )
          }
          return (
            <ListItemButton key={`${item.title}-${index}`}>
              <ListItemIcon>
                <Star />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          )
        })
      }
    </List >
  )
}

export default MenuItems
