import React from 'react'
import { List, FlexboxGrid, Icon } from 'rsuite'

const styleCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px'
};

const slimText = {
  fontSize: '0.666em',
  color: '#97969B',
  fontWeight: 'lighter',
  paddingBottom: 5
};

const titleStyle = {
  paddingBottom: 5,
  whiteSpace: 'nowrap',
  fontWeight: 500
};

export default function ElementCard({data}) {
  return (
    <List hover>
      {data.map((item, index) => (
        <List.Item key={item['id']} index={index}>
          <FlexboxGrid>
            {/*icon*/}
            <FlexboxGrid.Item colspan={2} style={styleCenter}>
              { item.avatar
                ? <img src={item.avatar} />
                : <Icon icon="image" size="4x" style={{ color: 'darkgrey', fontSize: '1.5em' }} />
              }
            </FlexboxGrid.Item>
            {/*base info*/}
            <FlexboxGrid.Item
              colspan={6}
              style={{
                ...styleCenter,
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'hidden'
              }}
            >
              <div style={titleStyle}>{item['name']}</div>
              <div style={slimText}>
                <div>{item['description']}</div>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
  )
}