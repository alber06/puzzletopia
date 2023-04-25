import React from 'react'
import PropTypes from 'prop-types'
import Menubar from '@module/Menubar'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import styles from './MenuBarLayout.module.css'

const MenuBarLayout = ({ children }: {children: React.ReactNode}) => {
  const router = useRouter()

  return (
    <div>
      {router.pathname !== '/_error' && <Menubar />}
      <Container className={styles.Container}>
        {children}
      </Container>
    </div>
  )
}

MenuBarLayout.propTypes = {
  children: PropTypes.object
}

export default MenuBarLayout
