import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { Box, Button, TextField, Typography } from '@mui/material'
import SuccessText from 'frontend/components/elements'

import styles from './puzzle2.module.css'

const Puzzle2 = () => {
  const { data: session, status: sessionStatus, update } = useSession() as { data: UserSession, status: string, update: Function }
  const [ numbersString, setNumbersString ] = useState<string>('')
  const [ value, setValue ] = useState<number | ''>('')
  const [ status, setStatus ] = useState<string>('')
  const [ alreadySolved, setAlreadySolved ] = useState<boolean>(false)

  const fetchData = async () => {
    const res = await fetch('/api/puzzles/puzzle2')
    const data = await res.json()

    setNumbersString(data?.numbers)
  }

  const solve = async () => {
    const res = await fetch('/api/puzzles/puzzle2/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number: value})
    })
    const data = await res.json()

    setStatus(data?.ok ? 'SOLVED': 'FAILED')
  }

  const tryAgain = async() => {
    setStatus('')
    setValue('')

    await fetchData()
  }
 
  useEffect(() => {
    if (sessionStatus === 'loading') {
      return
    } else if (sessionStatus === 'unauthenticated') {
      Router.push('/api/auth/signin')
    }

    if (session?.user?.puzzle2Complete) {
      setAlreadySolved(true)
    } else {
      fetchData()
    }

    return () => update()
  }, [ session, sessionStatus, update ])

  const puzzleIncomplete = () => {
    return (
      <>
        <Typography variant='subtitle1'>Enter the 300th biggest number</Typography>
        <div className={styles.NumbersContainer}>
          <Typography variant='body2'>{numbersString}</Typography>
        </div>
        <TextField className='pt-number-input' value={value} disabled={status !== ''} type='number' label='Value' variant='outlined' onChange={(e) => setValue(parseInt(e.target.value))}/>
        
        { !status && <Button variant='outlined' onClick={solve} disabled={!value}>Solve</Button> }
        { status === 'SOLVED' && <Typography color='green'>Congrats! Correct Answer!</Typography>}
        { status === 'FAILED' &&  
          <>
            <Typography color='red'>Sorry, wrong answer :(</Typography>
            <br />
            <Button variant='outlined' onClick={tryAgain}>Try again</Button>
          </> 
        }
      </>
    )
  }

  return (
    <Box className={styles.Container}>
      <Typography variant='h3'>Puzzle 2</Typography>
      { alreadySolved ? <SuccessText text='You have already solved this puzzle!'></SuccessText> : puzzleIncomplete() }
    </Box>
  )
}

export default Puzzle2