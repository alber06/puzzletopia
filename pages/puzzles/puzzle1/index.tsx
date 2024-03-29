import { Box, Button, TextField, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import Router from 'next/router';
import { useEffect, useState } from 'react'

import SuccessText from 'frontend/components/elements/SuccessText';
import { getPuzzleData, solvePuzzle } from 'frontend/api/PuzzlesAPI';

const Puzzle1 = () => {
  const { data: session, status: sessionStatus, update } = useSession() as { data: UserSession, status: string, update: Function }
  const [ numbers, setNumbers ] = useState<number[]>([])
  const [ value1, setValue1 ] = useState<number | ''>('')
  const [ value2, setValue2 ] = useState<number | ''>('')
  const [ status, setStatus ] = useState<string>('')
  const [ alreadySolved, setAlreadySolved ] = useState<boolean>(false)

  const fetchData = async () => {
    const { data } = await getPuzzleData('puzzle1')

    setNumbers(data?.numbers)
  }

  const solve = async () => {
    if (value1 && value2) {
      const { data } = await solvePuzzle('puzzle1', { numbers: [ value1, value2 ] })
  
      setStatus(data?.ok ? 'SOLVED': 'FAILED')
    }
  }

  const tryAgain = async() => {
    setStatus('')
    setValue1('')
    setValue2('')

    await fetchData()
  }

  useEffect(() => {
    if (sessionStatus === 'loading') {
      return
    } else if (sessionStatus === 'unauthenticated') {
      Router.push('/api/auth/signin')
    }

    if (session?.user?.puzzle1Complete) {
      setAlreadySolved(true)
    } else {
      fetchData()
    }
    
    return () => update()
  }, [ session, sessionStatus, update ])

  const puzzleIncomplete = () => {
    return (
      <>
        <Typography variant='subtitle1'>Enter both numbers, no matter the order</Typography>
        <div className='pt-numbers-container'>
          { numbers.map((number, index) => (<Typography variant='h5' key={`${index}${number}`}>{number}</Typography>)) }
        </div>
        <TextField className='pt-number-input' value={value1} disabled={status !== ''} type='number' label='First Value' variant='outlined' onChange={(e) => setValue1(parseInt(e.target.value))}/>
        <TextField className='pt-number-input' value={value2} disabled={status !== ''} type='number' label='Second Value' variant='outlined' onChange={(e) => setValue2(parseInt(e.target.value))}/>
        
        { !status && <Button variant='outlined' onClick={solve} disabled={!value1 || !value2}>Solve</Button> }
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
    <Box className='pt-container'>
      <Typography variant='h3'>Puzzle 1</Typography>
      { alreadySolved ? <SuccessText text='You have already solved this puzzle!'></SuccessText> : puzzleIncomplete() }
    </Box>
  )
}

export default Puzzle1