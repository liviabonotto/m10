import React, { useState } from 'react'
import styles from './home-styles.module.scss'
import Sidebar from '../../components/sidebar/sidebar'
import Breadcrump from '../../components/breadcrumb/breadcrumb'
import Button from '../../components/button/button'
import InputSearch from '../../components/input-search/input-search'
import { Divider } from '@mui/material'
import ModalCard from '../../components/modal-card/modal-card'
import ProjectCard from '../../components/project-card/project-card'

const Home: React.FC = () => {
  const [openedPackage, setOpenedPackage] = useState<any>(null)
  // const [creatingPackage, setCreatingPackage] = useState(false)

  return (
    <div cy-testid="home-open" className={styles.home}>
      <Sidebar />

      <div className={styles.container}>
        <div className={styles.header}>
          <Breadcrump index={2} />

          <div className={styles.info}>
            <h1>Projetos</h1>
          </div>
        </div>

        <div className={styles.filterSection}>
          <h2 className={styles.subtitle}>Projetos ativos</h2>

          <div className={styles.filters}>
            <Button text='FILTRAR' type='secondary' size='small' icon='filter' action={() => { }} />
            <Button text='CRIAR PROJETO' type='secondary' size='small' icon='add' action={() => { }} />
            <InputSearch placeholder='Pesquisar...' handleChange={() => null} />
          </div>
        </div>

        <Divider className={styles.divider} />

        <div className={styles.body}>
          <ProjectCard
            text='Ambev'
            descriptiontext='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
            url='/project'
          />

          <ProjectCard
            text='IFood'
            descriptiontext='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
            url='/project'
          />
        </div>
      </div>
      {openedPackage && (
        <ModalCard
          handleClose={() => { setOpenedPackage(null) }}
          card={openedPackage}
        />
      )}
    </div>
  )
}

export default Home
