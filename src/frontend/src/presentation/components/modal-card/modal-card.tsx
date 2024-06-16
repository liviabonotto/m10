import React from 'react'
import styles from './modal-card-styles.module.scss'
import Button from '../button/button'
import Divider from '@mui/material/Divider'
import { capitalize } from '../../../utils/utils'
import { type CardProps } from '../../pages/project/components/card/card'

type Props = {
  card: CardProps
  handleClose: () => void
  createBranch?: () => JSX.Element;
}

const ModalCard: React.FC<Props> = ({ card, handleClose }: Props) => {
  return (
    <div cy-testid="modal-card" className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>{card.text}</h1>
            <h2>nome-da-branch</h2>
          </div>
          <div className={styles.closeButtonContainer}>
            <Button
              text="CLOSE"
              type="secondary"
              icon="close"
              size="small"
              action={() => { handleClose() }}
            />
          </div>
        </div>
        <Divider />
        <div className={styles.section}>
          <div className={styles.infoSection}>
            <div className={styles.infoBlock}>
              <h3>Responsável</h3>
              <div className={styles.userDetails}>
                <div className={styles.userAvatar}>J</div>
                <div>
                  <p>{card.author}</p>
                  <p>{card.userRole}</p>
                </div>
              </div>
            </div>
            <div className={styles.infoBlock}>
              <h3>Aprovador</h3>
              <div className={styles.userDetails}>
                <div className={styles.userAvatar}>J</div>
                <div>
                  <p>{card.author}</p>
                  <p>{card.userRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className={styles.section}>
          <div className={styles.statusSection}>
            <div className={styles.statusBlock}>
              <h3>Ambiente atual</h3>
              <p>Developer</p>
            </div>
            <div className={styles.statusBlock}>
              <h3>Status</h3>
              {
                card.status === 'conflict'
                  ? <div className={styles.statusConflictContainer}>
                    <p className={styles.statusConflict}>Foram identificados conflitos</p>
                    <button className={styles.resolveButton}>RESOLVER</button>
                  </div>
                  : <p className={styles.status}>{card.status}</p>
              }
            </div>
          </div>
        </div>
        <Divider />
        <div className={styles.section}>
          <div className={styles.detailSection}>
            <div className={styles.detailBlock}>
              <h3>Data de criação</h3>
              <p>{card.creationDate}</p>
            </div>
            <div className={styles.detailBlock}>
              <h3>Tipo do pacote</h3>
              <p>{capitalize(card.text.split('/')[0])}</p>
            </div>
          </div>
        </div>
        <Divider />
        <div className={styles.section}>
          <div className={styles.descriptionSection}>
            <h3>Descrição</h3>
            <p>{card.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCard
