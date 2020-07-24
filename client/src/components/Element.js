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

export default function Element(props) {
  const { setItemIndex, links, setLinks } = useContext(context)
  const { item, index, multi, modal, selected, setSelected } = props

  const handlerOnClick = (item, index) => {
    let obj = {...selected}
    // if "multi" === "true", than you can select many items together
    if (multi === 'true') {
      if (obj[index]) {
        delete obj[index]
        setSelected(obj)
      } else {
        setSelected({...obj, [index]: item._id})
      }
    // if "multi" === "false", than you can select only one item
    } else {
      setSelected({[index]: item._id})
      setItemIndex(index)
      // if "modal" === "false", than <Element /> used on aside
      // and we reset counter
      if (modal === 'false') setLinksMsgsFalse(item)
    }
  }

  // reset unreaded messages counter while select item
  const setLinksMsgsFalse = (item) => {
    const to = item._id
    const obj = { ...links }
    obj[to] = { ...obj[to], 'msgs': false }
    setLinks(obj)
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

      { modal === 'false'
        ? <div style={{...styles.wrap, ...styles.flex}}>
            <ElementDeleteSymbol item={item} index={index} selected={selected} setSelected={setSelected}/>
            <ElementInformSymbol item={item} />
          </div>
        : <></>
      }

    </section>
  )
}