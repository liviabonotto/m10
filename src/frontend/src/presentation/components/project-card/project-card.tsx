import React from 'react'
import styles from './project-card-styles.module.scss'
import { Card, Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type Props = {
  url: string
  text: string
  descriptiontext: string
}

const ProjectCard: React.FC<Props> = ({ text, descriptiontext }: Props) => {
  const navigate = useNavigate()

  return (
    <Card cy-testid="project-card" className={styles.card} sx={{ width: '247px', height: '309px' }} onClick={() => { navigate('/project') }}>
      <div className={styles.image}></div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '215px', height: '141px' }}>
        <div className={styles.title}>{text}</div>
        <div className={styles.members}>
          <p> Pessoas: </p> <Avatar sx={{ height: '24px', width: '24px' }} /><Avatar sx={{ height: '24px', width: '24px', margin: '0 0 0 -2px' }} /><Avatar sx={{ height: '24px', width: '24px', margin: '0 0px 0 -2px' }} />
        </div>
        <div className={styles.description}>{descriptiontext}</div>
      </div>
    </Card >
  )
}

export default ProjectCard
