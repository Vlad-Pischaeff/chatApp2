import React from 'react'
import {Footer} from 'rsuite'
const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '3rem'
  }
}

export default function CustomFooter() {

  return (
    <Footer style={styles.footer}>Designed by Pischaeff Vlad, 2020</Footer>
  )
}