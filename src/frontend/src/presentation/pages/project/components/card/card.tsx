import { capitalize } from '../../../../../utils/utils'
import AlertModal from '../../../../components/alert-modals/alert-modal'
import Button from '../../../../components/button/button'
import styles from './card.module.scss'
import React, { useState } from 'react'

export type CardProps = {
  author: string
  userRole: string
  creationDate: string
  status: string
  text: string
  type?: string
  description?: string
  moveToColumn?: string
  moveCard?: () => void
  handleCLick?: () => any
}

const Card: React.FC<CardProps> = ({
  author,
  userRole,
  creationDate,
  status,
  text,
  type,
  moveToColumn,
  moveCard,
  handleCLick
}: CardProps) => {
  const [openAlert, setOpenAlert] = useState(false)

  const teste = (e: any): void => {
    if (e.nodeName === 'DIV') {
      handleCLick?.()
    }
  }

  return (
    <>

      <div cy-testid="pkg-card" className={styles.card} onClick={(e) => { teste(e.target) }}>
        <div className={styles.header}>
          <div className={styles.logo}>
            {author[0]?.toUpperCase()}
          </div>
          <div>
            <div className={styles.author}>{author}</div>
            <div className={styles.userRole}>{userRole}</div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.date}>Data de criação: {creationDate}</div>
          <div className={styles.text}>{text}</div>
          <div className={styles.status}>
            Status: <span>{status}</span>
          </div>

          <div className={styles.type}>{capitalize(type ?? '')}</div>
        </div>

        {moveToColumn && (
          <div className={styles.footer}>
            <hr />
            <Button text={`Mover para ${moveToColumn}`} size='small' type='kanban' action={() => { setOpenAlert(true) }} />
          </div>
        )}
      </div>

      <AlertModal title='Mudança de ambiente' description={`Você confirma a solicitação de mudança do pacote “${text}” do ambiente desenvolvimento para o ambiente develop?`} onClose={() => { setOpenAlert(false) }} opened={openAlert} confirm={() => { moveCard?.() }} />
    </>
  )
}

export default Card
