import React, { useContext } from 'react'
import { context } from '../context/context'
import './Element.css'
import ElementAvatar from './ElementAvatar'
import ElementDeleteSymbol from './ElementDeleteSymbol'
import ElementInformSymbol from './ElementInformSymbol'

const styles = {
  flex: { display: 'flex', justifyContent: 'space-between', },
  content: {
    flex: '1 1 auto',
    margin: '0 0 0 0.4rem',
    flexFlow: 'column nowrap',
    overflow: 'hidden',
  },
  name: { fontSize: '1.2rem', lineHeight: '2rem', },
  description: { fontSize: '0.8rem', },
  elipsis: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }, 
  select: { background: '#0052a2', },
  noselect: { background: 'dodgerblue', },
  icon: { margin: '0 0.2rem',  },
  wrap: { flex: '1 0 auto', alignItems: 'flex-end', flexFlow: 'column nowrap', height: '4rem',}
}

function Element(props) {
  const { setItemIndex } = useContext(context)
  const { item, index, multi, selected, setSelected } = props

  const handlerOnClick = (item, index) => {
    let obj = {...selected}
    if (multi === 'true') {
      if (obj[index]) {
        delete obj[index]
        setSelected(obj)
      } else {
        setSelected({...obj, [index]: item._id})
      }
    } else {
     setSelected({[index]: item._id})
     setItemIndex(index)
    }
  }

  return (
    <section style={selected[index] 
                    ? {...styles.select, ...styles.flex} 
                    : {...styles.noselect, ...styles.flex}} 
                    onClick={() => handlerOnClick(item, index)} key={index} 
                    className="element" >

      <ElementAvatar item={item} />

      <div style={{...styles.content, ...styles.flex}} >
        <div style={{...styles.name, ...styles.elipsis}} >{item.name ? item.name : item.login}</div>
        <div style={{...styles.description, ...styles.elipsis}} >{item.description}</div>
      </div>

      <div style={{...styles.wrap, ...styles.flex}}>
        <ElementDeleteSymbol item={item} index={index} selected={selected} />
        <ElementInformSymbol item={item} />
      </div>

    </section>
  )
}

export default Element