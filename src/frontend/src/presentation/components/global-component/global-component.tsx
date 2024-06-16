import React from 'react'
import Styles from './global-component-styles.module.scss'

type Props = {
  text: string
}

const Example: React.FC<Props> = ({ text }: Props) => {
  return (
    <div className={Styles.example}>{text}</div>
  )
}

export default Example
