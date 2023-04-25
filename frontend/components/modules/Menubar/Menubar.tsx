import React from 'react'
import { Toolbar, AppBar, Typography, IconButton, Menu, MenuItem, Box} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Router from 'next/router'
import { signOut } from 'next-auth/react'

const Menubar = () => {
  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null)


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const goTo = (route: string) => {
    Router.push(route)
  }

  const handleLogout = () => {
    signOut()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={3} position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => goTo('/home')}>
            Puzzletopia
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => goTo('/profile/blabla')}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Menubar
