import { Box, CircularProgress, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import styles from './profile.module.css'

const Profile = () => {
  const { status: sessionStatus } = useSession() as { status: string }
  const [ user, setUser ] = useState<User | null>(null)
  const [ loading, setLoading ] = useState<boolean>(false)
  const router = useRouter()
  const { userName } = router.query as { userName: string }
  
  useEffect(() => {
    if (sessionStatus === 'loading') {
      return
    } else if (sessionStatus === 'unauthenticated') {
      Router.push('/api/auth/signin')
    }

    const fetchData = async () => {
      setLoading(true)
      const plainUserName = userName.slice(1)
      const res = await fetch(`/api/profiles/${plainUserName}`)
      const userData = await res.json()

      if (res.ok) {
        setUser(userData)
      }
      setLoading(false)
    }

    fetchData()
  }, [ sessionStatus, userName ])

  const getPuzzlesStatus = () => {
    return (
      user ?
      <>
        <Typography variant='h3'>{userName}</Typography>
        <Typography variant='h5'>Puzzle1: {user?.puzzle1Complete ? <span className={styles.GreenText}>COMPLETE</span> : <span className={styles.RedText}>INCOMPLETE</span>}</Typography>
        <Typography variant='h5'>Puzzle2: {user?.puzzle2Complete ? <span className={styles.GreenText}>COMPLETE</span> : <span className={styles.RedText}>INCOMPLETE</span>}</Typography>

      </> : 
      <Typography color={'red'}>Profile Not Found</Typography>

    )
  }

  return (
    <Box className='pt-container'>
      { loading && <CircularProgress /> }
      { !loading && getPuzzlesStatus() }
    </Box>
  )
}

export default Profile