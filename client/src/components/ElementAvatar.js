import React, { useContext } from 'react'
import { context, useGlobalLinksContext } from '../context/context'
import { Badge, Icon } from 'rsuite'

const styles = {
  img: { height: '3.5rem', },
  noimg: { fontSize: '3.3rem', width: '3.5rem', textAlign: 'center', },
  grey: { filter: 'grayscale(100%)', },
}

export default function ElementAvatar(props) {
  const { links } = useGlobalLinksContext()
  const { activeKey } = useContext(context)
  const { item } = props
  const content = links[item._id] ? links[item._id]['msgs'] ?? false : false
  // console.log('ElementAvatar ...', item._id, links[item._id], !!links[item._id], content)
  return (
    <div>
      { (() => {
          if (activeKey === 'conversations') {
            return item.avatar
              // if user has "avatar" then show image
              ? <Badge  content={content}><img src={item.avatar} alt=''
                        style={ links[item._id] && links[item._id].online
                          ? {...styles.img}
                          : {...styles.img, ...styles.grey}} /></Badge>
              // if user has no "avatar" then show icon
              : <Badge  content={content}><Icon style={styles.noimg}
                        icon={ links[item._id] && links[item._id].online 
                          ? "user"
                          : "user-o"} /></Badge>
          } else {
            return item.avatar
              // if chat room has "avatar" then show image
              ? <Badge content={content}><img src={item.avatar} style={styles.img} alt='' /></Badge>
              // if chat room has no "avatar" then show icon
              : <Badge content={content}><Icon icon="image" style={styles.noimg} /></Badge>
          }
        })()
      }
    </div>
  )
}