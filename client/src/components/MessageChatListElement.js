import React, { useContext } from 'react'
import { context } from '../context/context'

const styles = {
  wrap: { maxWidth: '75%',  display: 'flex',  flexFlow: 'row nowrap', margin: '1rem', },
  mywrap: { display: 'flex',  flexFlow: 'row-reverse nowrap', margin: '1rem', },
  wrapmsg: { maxWidth: '75%',  display: 'flex',  flexFlow: 'column nowrap', padding: '0.2rem 0.3rem', },
  mymsg: { background: '#a6d7ff', color: 'black', },
  msg: { background: '#409cff', color: 'white', },
  img: { width: '3rem', height: '3rem', },
  arrow: {
    margin: '0',
    padding: '0',
    content: '',  
    width: '1rem',
    height: '1rem',
    position: 'relative',
    borderStyle: 'solid',
  },
  left: {
    borderWidth: '1rem 0 0 1rem',
    borderColor: 'rgb(64, 156, 255) transparent transparent transparent',
  },
  right: {
    borderWidth: '0 0 1rem 1rem',
    borderColor: ' transparent transparent transparent rgb(166, 215, 255)',
  },
  date: { fontSize: '0.7rem', },
  user: { fontSize: '1rem', },
  color: { color: 'cyan', },
  mycolor: { color: 'cornflowerblue', },
}

export default function MessageChatListElement(props) {
  const { item, date } = props
  const { credentials } = useContext(context)

  return credentials.userId !== item.from
      ? <section style={styles.wrap} >
          <img src={item.avatar} style={styles.img} alt='' />
          <span style={{...styles.arrow, ...styles.left}}></span>
          <article style={{...styles.wrapmsg, ...styles.msg}}>
            <div style={{...styles.date, ...styles.color}}> {date} </div>
            <div style={{...styles.user, ...styles.color}}> User {item.login} wrote : </div>
            <div> {item.text} </div>
          </article>
        </section>
      : <section style={styles.mywrap} >
          <img src={item.avatar} style={styles.img} alt='' />
          <span style={{...styles.arrow, ...styles.right}}></span>
          <article style={{...styles.wrapmsg, ...styles.mymsg}}>
            <div style={{...styles.date, ...styles.mycolor}}> {date} </div>
            <div> {item.text} </div>
          </article>
        </section>
}