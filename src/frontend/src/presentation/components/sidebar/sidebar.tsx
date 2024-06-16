import React from 'react'
import styles from './sidebar-styles.module.scss'
import Button from '../button/button'
import InputSearch from '../input-search/input-search'
import MenuItems, { type MenuItem } from '../menu-items/menu-items'
import { Divider } from '@mui/material'

const Sidebar: React.FC = () => {
  const data = {
    username: 'John Doe',
    email: 'johndoe@gmail.com'
  }

  const handleName = (): string => {
    const names = data.username.split(' ')

    return names.length < 2 ? names[0][0] : names[0][0] + names[1][0]
  }

  const navigation = [
    {
      title: 'Início',
      url: '/'
    },
    {
      title: 'Notificações',
      url: '/'
    },
    {
      title: 'Configurações',
      url: '/'
    }
  ]

  const projects: MenuItem[] = [
    {
      title: 'Projetos',
      url: '/',
      subItems: [
        {
          title: 'Projeto 1',
          url: '/'
        },
        {
          title: 'Projeto 2',
          url: '/'
        }
      ]
    }
  ]

  const favorites: MenuItem[] = [
    {
      title: 'Favoritos',
      url: '/',
      subItems: [
        {
          title: 'Projeto 1',
          url: '/'
        },
        {
          title: 'Projeto 2',
          url: '/'
        }
      ]
    }
  ]
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>
          {
            handleName().toUpperCase()
          }
        </div>
        <div>
          <div className={styles.username}>{data.username}</div>
          <div className={styles.email}>{data.email}</div>
        </div>
      </div>

      <div className={styles.body}>
        <InputSearch placeholder="Pesquisar..." handleChange={() => null} />

        <MenuItems data={navigation} />
        <Divider />
        <MenuItems data={projects} />
        <MenuItems data={favorites} />
      </div>

      <div className={styles.footer}>
        <Button text='LOGOUT' type='logout' icon='right' size='large' invert action={() => { }} />
      </div>
    </div>
  )
}

export default Sidebar
