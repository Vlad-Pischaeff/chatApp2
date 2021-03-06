import React, { useContext } from 'react'
import { context, useGlobalCredentialsContext } from '../context/context'
import { Icon } from 'rsuite'

const styles = {
  wrap: { maxWidth: '75%',  display: 'flex',  flexFlow: 'row nowrap', margin: '1rem', },
  mywrap: { display: 'flex',  flexFlow: 'row-reverse nowrap', margin: '1rem', },
  wrapmsg: { maxWidth: '75%',  display: 'flex',  flexFlow: 'column nowrap', padding: '0.2rem 0.3rem', },
  mymsg: { background: '#a6d7ff', color: 'black', },
  msg: { background: '#409cff', color: 'white', },
  img: { width: '3rem', height: '3rem', },
  noimg: { fontSize: '3rem', width: '3rem', textAlign: 'center', },
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

export default function MessageUserListElement(props) {
  const { item, date } = props
  const { credentials } = useGlobalCredentialsContext()
  const { items, itemIndex } = useContext(context)

  // console.log('MessageUserListElement ...render...', itemIndex, items )

  return credentials.userId !== item.from
      ? <section style={styles.wrap} >
          { !!items[itemIndex].avatar
              ? <img src={items[itemIndex].avatar} style={styles.img} alt='' />
              : <Icon icon="user" style={styles.noimg} />
          }
          <span style={{...styles.arrow, ...styles.left}}></span>
          <article style={{...styles.wrapmsg, ...styles.msg}}>
            <div style={{...styles.date, ...styles.color}}> {date} </div>
            <div> {item.text} </div>
          </article>
        </section>
      : <section style={styles.mywrap} >
          { !!credentials.avatar
              ? <img src={credentials.avatar} style={styles.img} alt='' />
              : <Icon icon="user" style={styles.noimg} />
          }
          <span style={{...styles.arrow, ...styles.right}}></span>
          <article style={{...styles.wrapmsg, ...styles.mymsg}}>
            <div style={{...styles.date, ...styles.mycolor}}> {date} </div>
            <div> {item.text} </div>
          </article>
        </section>
}