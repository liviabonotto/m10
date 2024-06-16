import React, { useEffect, useState } from 'react'
import styles from './project-styles.module.scss'
import Card, { type CardProps } from './components/card/card'
import Column from './components/column/column'
import Sidebar from '../../components/sidebar/sidebar'
import Breadcrump from '../../components/breadcrumb/breadcrumb'
import Button from '../../components/button/button'
import InputSearch from '../../components/input-search/input-search'
import { Divider } from '@mui/material'
import ModalCard from '../../components/modal-card/modal-card'
import AddPackageModal from './components/add-package-modal/add-package-modal'
import CreateBranchFromCard from '../../components/createBranchFromCard/createBranchFromCard.tsx'
import GithubService from '../../../data/services/github-service.ts'

const Project: React.FC = () => {
  const [openedPackage, setOpenedPackage] = useState<CardProps | null>(null)
  const [creatingPackage, setCreatingPackage] = useState(false)
  const [data, setData] = useState(
    {
      local: [
        {
          author: '',
          userRole: '',
          description: '',
          creationDate: '',
          status: '',
          text: ''
        }
      ],
      develop: [
        {
          author: 'John Doe',
          userRole: 'Desenvolvedor',
          description: '',
          creationDate: '29 abril 2024',
          status: 'pull request criado',
          text: 'fix/ajuste-campo-pagamento'
        }
      ],
      prod: [
        {
          author: 'John Doe',
          userRole: 'Desenvolvedor',
          description: '',
          creationDate: '15 abril 2024',
          status: 'pendente',
          text: 'release/0.1.0'
        },
        {
          author: 'John Doe',
          userRole: 'Desenvolvedor',
          description: '',
          creationDate: '25 abril 2024',
          status: 'pendente',
          text: 'release/0.2.0'
        },
        {
          author: 'John Doe',
          userRole: 'Desenvolvedor',
          description: '',
          creationDate: '28 abril 2024',
          status: 'pendente',
          text: 'release/0.2.1'
        }
      ]
    }
  )

  const handleName = (author: string): string => {
    const names = author.split(' ')

    return names.length < 2 ? names[0][0] : names[0][0] + names[1][0]
  }

  const handleMove = (to: string, index: number): void => {
    if (to === 'develop') {
      const newData = { ...data }
      newData.local[index].status = 'pull request criado'
      newData.develop.push(newData.local[index])
      newData.local.splice(index, 1)
      setData(newData)
    }
  }

  const handleCreate = (packageData: any) => {
    const newPackage: any = {
      author: 'John Doe',
      userRole: 'Desenvolvedor',
      description: packageData.description,
      creationDate: '07 abril 2024',
      status: 'pendente',
      text: packageData.text
    }

    const newData = { ...data }
    newData.local = [...newData.local, newPackage]
    setData(newData)
    setCreatingPackage(false)
  }

  useEffect(() => {
    const getBranches = async (): Promise<void> => {
      const response = await GithubService.getAllBranches()
      const branches: string[] = response.replace([/ /g], '').replace('*', '').split('\n').filter((branch: string) => !branch.includes('main') && !branch.includes('develop') && !branch.includes('HEAD'))

      const newData = { ...data }
      newData.local = branches.filter(branch => branch && branch).map((branch => {
        return {
          author: 'John Doe',
          userRole: 'Desenvolvedor',
          description: '',
          creationDate: '4 maio 2024',
          status: 'pendente',
          text: branch
        }
      }))
      setData(newData)
    }

    void getBranches()
  }, [])

  return (
    <div cy-testid="project-page" className={styles.project}>
      <Sidebar />

      <div className={styles.container}>
        <div className={styles.header}>
          <Breadcrump index={3} title='Projeto 1' />

          <div className={styles.info}>
            <h1>Projeto 1</h1>

            <div className={styles.infoContainer}>
              <div>
                <span>Empresa: </span> <span className={styles.date}>IFood</span>
              </div>

              <div>
                <span>Criado em: </span> <span className={styles.date}>06/05/2024</span>
              </div>

              <div className={styles.members}>
                <span className={styles.title}>Pessoas: </span>
                <span className={styles.logo}>
                  {handleName('John Doe').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.filterSection}>
          <h2 className={styles.subtitle}>Acompanhamento de pacotes e ambientes</h2>

          <div className={styles.filters}>
            <Button text='FILTRAR' type='secondary' size='small' icon='filter' action={() => { }} />
            <Button text='CRIAR COLUNA' type='secondary' size='small' icon='add' action={() => { }} />
            <Button text='NOVO PACOTE' type='primary' size='small' icon='add' action={() => { setCreatingPackage(true) }} />
            <InputSearch placeholder='Pesquisar...' handleChange={() => null} />
          </div>
        </div>

        <Divider className={styles.divider} />

        <div className={styles.body}>
          <Column title='Desenvolvendo' items={data?.local.length ?? 0}>
            {data?.local.map((card, index) => {
              return (
                <Card
                  key={`${card.text}-${index}`}
                  author={card.author}
                  creationDate={card.creationDate}
                  text={card.text}
                  userRole={card.userRole}
                  status={card.status}
                  type={card.text.split('/')[0]}
                  moveToColumn={card.status === 'pendente' ? 'Develop' : ''}
                  moveCard={() => { handleMove('develop', index) }}
                  handleCLick={() => { setOpenedPackage(card) }}
                />
              )
            })}
          </Column>
          <Column title='Develop' items={data?.develop.length ?? 0}>
            {data.develop.map((card, index) => {
              return (
                <Card
                  key={`${card.text}-${index}`}
                  author={card.author}
                  creationDate={card.creationDate}
                  text={card.text}
                  type={card.text.split('/')[0]}
                  userRole={card.userRole}
                  status={card.status}
                  moveCard={() => { handleMove('prod', index) }}
                  handleCLick={() => { setOpenedPackage(card) }}
                />
              )
            })}
          </Column>
          <Column title='Produção' items={data?.prod.length ?? 0}>
            {data.prod.map((card, index) => {
              return (
                <Card
                  key={`${card.text}-${index}`}
                  author={card.author}
                  creationDate={card.creationDate}
                  text={card.text}
                  type={card.text.split('/')[0]}
                  userRole={card.userRole}
                  status={card.status}
                  handleCLick={() => { setOpenedPackage(card) }}
                />
              )
            })}
          </Column>
        </div>
      </div>
      {openedPackage && (
        <ModalCard
          handleClose={() => { setOpenedPackage(null) }}
          card={openedPackage}
          createBranch={() => <CreateBranchFromCard cardName={openedPackage.text} />}
        />
      )}

      <AddPackageModal
        open={creatingPackage}
        setOpen={setCreatingPackage}
        handleClose={() => { setCreatingPackage(false) }}
        handleCreate={(packageData) => { handleCreate(packageData) }}
      />

    </div>
  )
}

export default Project
