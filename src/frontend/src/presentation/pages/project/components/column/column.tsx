import React from 'react'
import Styles from './column.module.scss'

type Props = {
  title: string
  items: number
  children: React.ReactNode
}

const Column: React.FC<Props> = ({ title, items, children }) => {
  return (
    <section cy-testid="pkgs-column" className={Styles.column}>
      <div className={Styles.header}>
        <h2 cy-testid="column-title" >{title}</h2>
        <div className={Styles.items}>{items}</div>
      </div>
      <div className={Styles.body}>
        {children}
      </div>
    </section>
  )
}

export default Column
